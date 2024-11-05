import { UserAvatar } from "../user-avatar";
import Block from "../../framework/Block";
import "./styles.pcss";

type TChatPreviewProps = {
  userName: string;
  message: string;
  time: string;
  newMessagesCount: number;
  avatarIconSrc: string;
  avatarImageSrc?: string;
  onClick: () => Promise<void>;
}

export class ChatPreview extends Block {
  constructor(props: TChatPreviewProps) {
    super({ 
      ...props,
      UserAvatar: new UserAvatar({
        className: "chat-preview-avatar",
        iconSrc: props.avatarIconSrc,
        imageSrc: props.avatarImageSrc,
      }),
      events: {
        click: props.onClick,
      }
    });
  }

  override render() {
    return `
      <div class="chat-preview-container">
        <div class="chat-preview-avatar-wrapper">
          {{{ UserAvatar }}}
        </div>

        <div class="chat-preview-text-info-container">
          <p class="chat-preview-user-name">
            {{userName}}
          </p>
          <p class="chat-preview-message-text">
            {{message}}
          </p>
        </div>

        <div class="chat-preview-info-container">
          <p class="chat-preview-time-info">
            {{time}}
          </p>
          {{#if newMessagesCount}}
            <p class="new-messages-info">
              {{newMessagesCount}}
            </p>
          {{/if}}
        </div>
      </div>
    `;
  }
};
