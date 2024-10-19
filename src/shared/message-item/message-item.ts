import Block from "../../framework/Block";
import CheckedIcon from "../../assets/Checked.svg";
import "./styles.pcss";

type TMessageItemProps = {
  text: string;
  time: string;
  isChecked?: boolean;
  isCurrentUser: boolean;
}

export class MessageItem extends Block {
  constructor(props: TMessageItemProps) {
    super({
      ...props,
      checkedIconSrc: CheckedIcon,
    });
  }

  override render() {
    if (this.props.isCurrentUser) {
      return `
        <div class="chat-current-user-message-container">
          <p>{{ text }}</p>
          <div class="chat-current-user-message-time">
            {{#if isChecked}}
              <image src={{checkedIconSrc}} />
            {{/if}}
            {{ time }}
          </div>
        </div>
      `
    }

    return `
      <div class="chat-user-message-container">
        <p>{{ text }}</p>
        <p class="chat-user-message-time">
          {{ time }}
        </p>
      </div>
    `;
  }
};
