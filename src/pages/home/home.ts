import { Button } from "../../shared/button";
import Block from "../../framework/Block";
import ArrowRightIcon from "../../assets/ArrowRight.svg";
import PictureFillIcon from "../../assets/PictureFill.svg";
import AttachIcon from "../../assets/Attach.svg";
import ArrowRightPrimaryIcon from "../../assets/ArrowRightPrimary.svg";
import "./styles.pcss";
import { UserAvatar } from "../../entities/user-avatar";
import { ChatPreview } from "../../entities/chat-preview";
import { chats } from "../../assets";

export class HomePage extends Block {
  constructor() {
    super({
      ButtonToProfile: new Button({
        label: "Профиль",
        id: "btnToProfile",
        className: "chats-button-to-profile",
        buttonIconSrc: ArrowRightIcon,
      }),
      Chats: chats.map(chat =>  new ChatPreview({ ...chat })),
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
      }),
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

            <div></div>

            <div class="chat-message-input-wrapper">
              {{{ AttachButton }}}
              <input 
                class="chat-message-input"
                placeholder="Сообщение"
              />
              {{{ SendButton }}}
            </div>
          </div>
        </div>
      </main>
    `;
  }
};
