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
        className: "chatsButtonToProfile",
        buttonIconSrc: ArrowRightIcon,
      }),
      Chats: chats.map(chat =>  new ChatPreview({ ...chat })),
      UserAvatar: new UserAvatar({
        className: "chatAvatar",
        iconSrc: PictureFillIcon,
      }),
      AttachButton: new Button({
        buttonIconSrc: AttachIcon,
        alt: "Прикрепить",
        className: "chatMessageAttachButton",
      }),
      SendButton: new Button({
        buttonIconSrc: ArrowRightPrimaryIcon,
        alt: "Отправить",
        className: "chatMessageSendButton",
      }),
    });
  }

  override render() {
    return `
      <main>
        <div class="homePageContainer">
          <div class="chatsContainer">
            <div class="chatsHeader">
              {{{ ButtonToProfile }}}

              <input 
                type="search" 
                placeholder="Поиск" 
                class="chatsSearchInput"
              />
            </div>

            {{{ Chats }}}
          </div>

          <div class="chatContainer">
            <div class="chatUserInfoContainer">
              <div class="chatAvatarWrapper">
                {{{ UserAvatar }}}
              </div>
              <p class="chatPreviewUserName">
                Андрей
              </p>
            </div>

            <div></div>

            <div class="chatMessageInputWrapper">
              {{{ AttachButton }}}
              <input 
                class="chatMessageInput"
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
