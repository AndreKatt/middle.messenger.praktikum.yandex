import { getDateString, getTimeString } from "../../utils/getDateString";
import { isSameDate } from "../../utils/isSameDate";
import { getAvatarSrc } from "../../utils/getEndPoint";
import { Routes } from "../../framework/Router";
import { Button } from "../../shared/button";
import { MessageItem } from "../../shared/message-item";
import { UserAvatar } from "../../entities/user-avatar";
import { ChatPreview } from "../../entities/chat-preview";
import { MessengerService } from "./messenger.service";
import { SearchInput } from "../../shared/search-input";
import { Input } from "../../shared/input";
import { ChatUser } from "../../entities/chat-user";
import Block from "../../framework/Block";
import AddIcon from "../../assets/Add.svg";
import ArrowRightIcon from "../../assets/ArrowRight.svg";
import PictureFillIcon from "../../assets/PictureFill.svg";
import DeleteIcon from "../../assets/Delete.svg";
import AttachIcon from "../../assets/Attach.svg";
import CheckedIcon from "../../assets/Checked.svg";
import ArrowRightPrimaryIcon from "../../assets/ArrowRightPrimary.svg";
import CloseIcon from "../../assets/Close.svg";
import UserIcon from "../../assets/User.svg";
import "./styles.pcss";

type TChatUser = {
  avatar: string | null;
  display_name: string;
  first_name: string;
  id: number;
  login: string;
  role: "regular";
  second_name: string;
}

type TChatData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

type TMessageData = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  is_read: boolean;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  }           
};

const AddNewChatModalContent = new Input({
  label: "Название чата",
  inputName: "chatName",
  inputId: "chatName",
  containerClassName: "field-container",
  labelClassName: "field-label",
  inputClassName: "modal-input",
});

const AddChatUserModalContent = new Input({
  label: "Логин",
  inputName: "login",
  inputId: "login",
  containerClassName: "field-container",
  labelClassName: "field-label",
  inputClassName: "modal-input",
});

const AttachButton = new Button({
  buttonIconSrc: AttachIcon,
  alt: "Прикрепить",
  className: "chat-message-attach-button",
});

export class MessengerPage extends Block {
  protected chats: TChatData[] = [];
  protected socket: WebSocket | null = null;
  protected selectedChat: TMessageData[] = [];
  protected currentChatId: number | null = null;

  protected readonly messengerService = new MessengerService();
  protected readonly currentUserId = localStorage.getItem("id");

  protected closeModal = () => {
    this.setProps({
      isModalOpen: false,
    });
    this.deleteLists("ModalContent");
  }

  protected setChats(chats: TChatData[]) {
    this.deleteLists("Chats");
    if (!!chats.length) {
      this.setProps({
        Chats: chats.map(chat => new ChatPreview({
          userName: chat.title,
          message: chat?.last_message?.content,
          time: getDateString(chat?.last_message?.time),
          newMessagesCount: chat?.unread_count,
          avatarIconSrc: PictureFillIcon,
          avatarImageSrc: getAvatarSrc(chat.avatar),
          onClick: () => this.setChatData(chat.title, chat.id, chat.avatar),
        })),
      });
    }
  }

  protected async setChatData(
    title: string,
    chatId: number,
    chatImg?: string,
  ) {
    this.currentChatId = chatId;
    this.setProps({
      selectedChatTitle: title,
      ChatAvatar: new UserAvatar({
        className: chatImg ? "full-chat-img-avatar" : "chat-avatar",
        iconSrc: PictureFillIcon,
        imageSrc: getAvatarSrc(chatImg),
        onClick: () => {
          const fileInput = document.getElementById("avatar") as HTMLInputElement;
          fileInput?.click();
          fileInput.onchange = (e) => {
            const input = e.target as HTMLInputElement;
            const file = input.files?.[0];

            if (file && this.currentChatId) {
              this.messengerService.UploadAvatar(file, this.currentChatId);
            }
          }
        }
      }),
    });
    const socket = await this.messengerService.ConnectToChat(chatId);

    if (socket) {
      this.socket = socket;
      socket.addEventListener('message', event => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            this.selectedChat = data.reverse();
            this.setProps({
              Messages: this.selectedChat.map((message, idx) => {
                let dateString = "";
                if (idx === 0 || !isSameDate(message?.time, this.selectedChat[idx-1]?.time)) {
                  dateString = getDateString(message.time, true);
                }
  
                return new MessageItem({
                  text: message.content,
                  time: getTimeString(new Date(message.time)),
                  isChecked: message.is_read,
                  isCurrentUser: message.user_id == this.currentUserId,
                  date: dateString && dateString
                });
              }),
              hasMessages: !!this.selectedChat.length,
            });
          } else if (data.type !== "pong") {
            this.messengerService.GetChatMessages(socket);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  }

  protected async updateChats() {
    const result = await this.messengerService.GetChats();

    if (result?.status === 200) {
      this.chats = JSON.parse(result.response);
      this.setChats(this.chats);
    } else if (result?.status === 401) {
      this.RouterService.go(Routes.AUTH);
    }
  }

  protected async updateChatUsers() {
    const response = await this.messengerService.GetChatsUsers(this.currentChatId!);

    if (response?.status === 200) {
      const users = JSON.parse(response.response) as TChatUser[];
      this.setProps({
        ModalContent: users.map((user) => new ChatUser({
          login: user.login,
          imageSrc: getAvatarSrc(user.avatar),
          onDeleteUser: async () => {
            await this.messengerService.DeleteUserFromChat(this.currentChatId!, user.id);
            this.updateChatUsers();
          },
        })),
      })
    }
  }

  constructor() {
    super({
      AddNewChatButton: new Button({
        className: "chats-add-new-button",
        buttonIconSrc: AddIcon,
        onClick: () => {
          this.setProps({
            isModalOpen: true,
            modalTitle: "Создать чат",
            ModalContent: AddNewChatModalContent,
            ModalSubmitButton: new Button({
              label: "Создать",
              className: "modal-button",
              onClick: async () => {
                const input = document.getElementById("chatName") as HTMLInputElement;
                const result = await this.messengerService.PostChat(input.value);
      
                if (result?.status === 200) {
                  this.deleteLists("Messages");
                  this.setProps({
                    selectedChatTitle: undefined,
                  });
                  await this.updateChats();
                  this.closeModal();
                }
              },
            }),
          })
        },
      }),
      ButtonToProfile: new Button({
        label: "Профиль",
        className: "chats-button-to-profile",
        buttonIconSrc: ArrowRightIcon,
        onClick: () => this.RouterService.go(Routes.PROFILE),
      }),
      SearchInput: new SearchInput({
        className: "chats-search-input",
        onInput: async(title) => {
          if (!!title) {
            setTimeout(() => {
              const filteredChats = this.chats.filter(chat => chat.title.toLowerCase().includes(title.toLowerCase()));
              this.setChats(filteredChats);
            }, 800);

            return;
          }
          this.setChats(this.chats);
        },
      }),
      DeleteChatButton: new Button({
        buttonIconSrc: DeleteIcon,
        alt: "Удалить",
        className: "chat-delete-button",
        onClick: async () => {
          if (this.currentChatId) {
            const result = await this.messengerService.DeleteChatById(this.currentChatId)

            if (result?.status === 200) {
              this.setProps({
                selectedChatTitle: undefined,
              })
              this.updateChats();
            }
          }
        },
      }),
      UsersButton: new Button({
        buttonIconSrc: UserIcon,
        className: "chat-delete-button",
        onClick: async () => {
          this.deleteChilds("ModalContent");
          this.updateChatUsers();
          this.setProps({
            isModalOpen: true,
            modalTitle: "Пользователи",
            ModalSubmitButton: new Button({
              label: "Добавить",
              className: "modal-button",
              onClick: () => {
                this.deleteLists("ModalContent");
                this.setProps({
                  modalTitle: "Добавить пользователя",
                  ModalContent: AddChatUserModalContent,
                  ModalSubmitButton: new Button({
                    label: "Добавить",
                    className: "modal-button",
                    onClick: async () => {
                      const input = document.getElementById("login") as HTMLInputElement;
                      const responseResult = await this.messengerService.GetUsersByLogin(input.value);
            
                      if (responseResult?.status === 200 && this.currentChatId) {
                        const data = JSON.parse(responseResult?.response);
                        this.messengerService.AddUserToChat(data[0].id, this.currentChatId);
                        this.closeModal();
                      }
                    }
                  })
                });
              },
            }),
          });
        }
      }),
      AttachButton: AttachButton,
      SendButton: new Button({
        buttonIconSrc: ArrowRightPrimaryIcon,
        alt: "Отправить",
        className: "chat-message-send-button",
        onClick: () => {
          const form = document.getElementById("messageForm") as HTMLFormElement;
          const formData = new FormData(form);

          if (this.socket) {
            this.socket.send(JSON.stringify(
              {
                content: formData.get("message"),
                type: "message"
              }
            ));
            this.messengerService.GetChatMessages(this.socket);
          }
        },
      }),
      ModalCloseButton: new Button({
        className: "modal-close-button",
        buttonIconSrc: CloseIcon,
        onClick: () => this.closeModal(),
      }),
      checkedIconSrc: CheckedIcon,
      formId: "messageForm",
    });

    setTimeout(() => this.updateChats());
  };

  override render() {
    return `
      <main>
        <div class="home-page-container">
          <div class="chats-left-side-container">
            <div class="chats-header">
              <div class="chats-header-buttons-container">
                {{{ AddNewChatButton }}}
                {{{ ButtonToProfile }}}
               </div>
              
              {{{ SearchInput }}}
            </div>

            <div class="chats-container">
              {{{ Chats }}}
            </div>
          </div>

          <div class="chat-container">
            {{#if selectedChatTitle}}
              <div class="chat-user-info-wrapper">
                <div class="chat-user-info-container">
                  <div class="chat-avatar-wrapper">
                    <input 
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      class="hidden-input"
                    />
                    {{{ ChatAvatar }}}
                  </div>
                  <p class="chat-preview-user-name">
                    {{ selectedChatTitle }}
                  </p>
                </div>
                <div class="chat-header-buttons-wrapper">
                  {{{ UsersButton }}}
                  {{{ DeleteChatButton }}}
                 </div>
              </div>

              <div class="chat-history-container">
                {{#if hasMessages}}
                  {{{ Messages }}}
                {{else}}
                  <p class="chat-empty-placeholder">
                    Здесь пока нет сообщений...
                  </p>
                {{/if}}
              </div>

              <div class="chat-message-input-wrapper">
                {{{ AttachButton }}}
                <form id={{formId}}>
                  <input 
                    class="chat-message-input"
                    placeholder="Сообщение"
                    name="message"
                  />
                </form>
                {{{ SendButton }}}
              </div>
            {{else}}
              <p class="chat-not-selected-placeholder">
                Выберите чат, чтобы отправить сообщение
              </p>
            {{/if}}
          </div>

          {{#if isModalOpen}}
            <div class="modal-wrapper">
              <div class="modal">
                {{{ ModalCloseButton }}}
                <h3 class="modal-title">
                  {{ modalTitle }}
                </h3>

                {{#if ModalContent}}
                  {{{ ModalContent }}}
                {{/if}}

                {{#if ModalSubmitButton}}
                  {{{ ModalSubmitButton }}}
                {{/if}}
              </div>
            </div>
          {{/if}}
        </div>
      </main>
    `;
  }
};
