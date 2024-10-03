import Block from "../../framework/Block";
import { UserAvatar } from "../user-avatar";
import "./styles.pcss";

type TChatPreviewProps = {
  userName: string;
  message: string;
  time: string;
  newMessagesCount: number;
  avatarIconSrc: string;
  avatarImageSrc?: string;
}

export class ChatPreview extends Block {
  constructor(props: TChatPreviewProps) {
    super({ 
      ...props,
      UserAvatar: new UserAvatar({
        className: "chatPreviewAvatar",
        iconSrc: props.avatarIconSrc,
        imageSrc: props.avatarImageSrc,
      })
    });
  }

  override render() {
    return `
      <div class="chatPreviewContainer">
        <div class="chatPreviewAvatarWrapper">
          {{{ UserAvatar }}}
        </div>

        <div>
          <p class="chatPreviewUserName">
            {{userName}}
          </p>
          <p class="chatPreviewMessageText">
            {{message}}
          </p>
        </div>

        <div class="chatPreviewInfoContainer">
          <p class="chatPreviewTimeInfo">
            {{time}}
          </p>
          {{#if newMessagesCount}}
            <p class="newMessagesInfo">
              {{newMessagesCount}}
            </p>
          {{/if}}
        </div>
      </div>
    `;
  }
};
