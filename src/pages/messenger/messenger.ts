import { Button } from "../../shared/button";
import { MessageItem } from "../../shared/message-item";
import { UserAvatar } from "../../entities/user-avatar";
import { ChatPreview } from "../../entities/chat-preview";
import { Routes } from "../../framework/Router";
import { MessengerService } from "./messenger.service";
import Block from "../../framework/Block";
import ArrowRightIcon from "../../assets/ArrowRight.svg";
import PictureFillIcon from "../../assets/PictureFill.svg";
import DeleteIcon from "../../assets/Delete.svg";
import AttachIcon from "../../assets/Attach.svg";
import CheckedIcon from "../../assets/Checked.svg";
import ArrowRightPrimaryIcon from "../../assets/ArrowRightPrimary.svg";
import "./styles.pcss";
import { SearchInput } from "../../shared/search-input";
import { getDateString, getTimeString } from "../../utils/getDateString";
import { isSameDate } from "../../utils/isSameDate";

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

type TSearchUserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: null;
  login: string;
  avatar: string;
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

  protected async setChatData(title: string, chatId: number) {
    this.currentChatId = chatId;
    const socket = await this.messengerService.ConnectToChat(chatId);

    if (socket) {
      this.socket = socket;
      socket.addEventListener('message', event => {
        try {
          const data = JSON.parse(event.data);
          if (Array.isArray(data)) {
            this.selectedChat = data.reverse();
            this.setProps({
              selectedChatTitle: title,
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
                })
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
    if (!result) {
      return;
    }

    if (result.status === 200) {
      const chats: TChatData[] = JSON.parse(result.response);
        
      if (!!chats.length) {
        this.setProps({
          Chats: chats.map(chat => new ChatPreview({
            userName: chat.title,
            message: chat?.last_message?.content,
            time: getDateString(chat?.last_message?.time),
            newMessagesCount: chat?.unread_count,
            avatarIconSrc: PictureFillIcon,
            avatarImageSrc: chat?.avatar,
            onClick: () => this.setChatData(chat.title, chat.id),
          })),
        });
      }
    } else if (result.status === 401) {
      this.RouterService.go(Routes.AUTH);
    }
  }

  constructor() {
    super({
      ButtonToProfile: new Button({
        label: "Профиль",
        className: "chats-button-to-profile",
        buttonIconSrc: ArrowRightIcon,
        onClick: () => this.RouterService.go(Routes.PROFILE),
      }),
      SearchInput: new SearchInput({
        className: "chats-search-input",
        onInput: async (login) => {
          if (login.length) {
            if (this.props.Messages) {
              this.deleteLists("Messages");      
            }
            const result = await this.messengerService.GetUsersByLogin(login);

            if (!result) {
              return;
            }

            if (!this.chats.length) {
              const chatsResult = await this.messengerService.GetChats();

              if (chatsResult && chatsResult.status === 200) {
                this.chats = JSON.parse(chatsResult.response);
              }
            }
            
            if (result.status === 200) {
              const data: TSearchUserData[] = JSON.parse(result.response);

              this.setProps({
                Users: data.map(user => new ChatPreview({
                  userName: user.login,
                  message: `${user.first_name} ${user.second_name}`,
                  time: "",
                  newMessagesCount: 0,
                  avatarIconSrc: PictureFillIcon,
                  avatarImageSrc: user.avatar,
                  onClick: async () => {
                    const result = await this.messengerService.PostChat(user.login, user.id);

                    if (result) {
                      this.deleteLists("Users");
                      this.updateChats();
                      this.setProps({
                        selectedChatTitle: user.login,
                        hasMessages: false,
                        isSearchUsers: false,
                      });

                      const chatId = JSON.parse(result).id;
                      this.setChatData(user.login, chatId);
                    }
                  },
                })),
                isSearchUsers: true,
              })
            }
            return;
          }
          this.deleteLists("Users");
          this.setProps({
            isSearchUsers: false,
          });
        }
      }),
      UserAvatar: new UserAvatar({
        className: "chat-avatar",
        iconSrc: PictureFillIcon,
      }),
      DeleteChatButton: new Button({
        buttonIconSrc: DeleteIcon,
        alt: "Удалить",
        className: "chat-delete-button",
        onClick: async () => {
          if (this.currentChatId) {
            const result = await this.messengerService.DeleteChatById(this.currentChatId)

            if (!result) {
              return;
            }

            if (result.status === 200) {
              this.setProps({
                selectedChatTitle: undefined,
              })
              this.updateChats();
            }
          }
        },
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
      checkedIconSrc: CheckedIcon,
      formId: "messageForm",
      isSearchUsers: false,
    });

    setTimeout(() => this.updateChats());
  };

  override render() {
    return `
      <main>
        <div class="home-page-container">
          <div class="chats-container">
            <div class="chats-header">
              {{{ ButtonToProfile }}}
              
              {{{ SearchInput }}}
            </div>

            {{{ Chats }}}
          </div>

          <div class="chat-container">
            {{#if selectedChatTitle}}
              <div class="chat-user-info-wrapper">
                <div class="chat-user-info-container">
                  <div class="chat-avatar-wrapper">
                    {{{ UserAvatar }}}
                  </div>
                  <p class="chat-preview-user-name">
                    {{ selectedChatTitle }}
                  </p>
                </div>
                {{{ DeleteChatButton }}}
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
        </div>

        {{#if isSearchUsers}}
          <div class="users-search-wrapper">
            {{{ Users }}}
          </div>
        {{/if}}
      </main>
    `;
  }
};
