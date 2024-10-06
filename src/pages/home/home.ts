import { chats, selectedChat } from "../../assets";
import { Button } from "../../shared/button";
import { MessageItem } from "../../shared/message-item";
import { UserAvatar } from "../../entities/user-avatar";
import { ChatPreview } from "../../entities/chat-preview";
import Block from "../../framework/Block";
import ArrowRightIcon from "../../assets/ArrowRight.svg";
import PictureFillIcon from "../../assets/PictureFill.svg";
import AttachIcon from "../../assets/Attach.svg";
import CheckedIcon from "../../assets/Checked.svg";
import ArrowRightPrimaryIcon from "../../assets/ArrowRightPrimary.svg";
import "./styles.pcss";

export class HomePage extends Block {
  constructor() {
    super({
      ButtonToProfile: new Button({
        label: "Профиль",
        className: "chats-button-to-profile",
        buttonIconSrc: ArrowRightIcon,
        onClick: () => this.AppService.ChangePage("/profile"),
      }),
      Chats: chats.map(chat => new ChatPreview({ ...chat })),
      UserAvatar: new UserAvatar({
        className: "chat-avatar",
        iconSrc: PictureFillIcon,
      }),
      AttachButton: new Button({
        buttonIconSrc: AttachIcon,
        alt: "Прикрепить",
        className: "chat-message-attach-button",
      }),
      SendButton: new Button({
        buttonIconSrc: ArrowRightPrimaryIcon,
        alt: "Отправить",
        className: "chat-message-send-button",
        onClick: () => {
          const form = document.getElementById("messageForm") as HTMLFormElement;
          const formData = new FormData(form);
          console.log(`message: ${formData.get("message")}`);
        },
      }),
      Messages: selectedChat.map(message => 
        new MessageItem({...message})
      ),
      checkedIconSrc: CheckedIcon,
      formId: "messageForm",
    });
  }

  override render() {
    return `
      <main>
        <div class="home-page-container">
          <div class="chats-container">
            <div class="chats-header">
              {{{ ButtonToProfile }}}

              <input 
                type="search" 
                placeholder="Поиск" 
                class="chats-search-input"
              />
            </div>

            {{{ Chats }}}
          </div>

          <div class="chat-container">
            <div class="chat-user-info-container">
              <div class="chat-avatar-wrapper">
                {{{ UserAvatar }}}
              </div>
              <p class="chat-preview-user-name">
                Андрей
              </p>
            </div>

            <div class="chat-history-container">
              <p class="chat-history-date">
                19 сентября
              </p>
              {{{ Messages }}}
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
          </div>
        </div>
      </main>
    `;
  }
};
