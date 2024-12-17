import { UserAvatar } from "../user-avatar";
import { Button } from "../../shared/button";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";

type TChatUserProps = {
  login: string,
  imageSrc?: string,
  onDeleteUser: () => void;
}

export class ChatUser extends Block {
  constructor(props: TChatUserProps) {
    super({
      ...props,
      UserAvatar: new UserAvatar({
        className: props.imageSrc ? "full-chat-img-avatar" : "chat-avatar",
        iconSrc: PictureFillIcon,
        imageSrc: props.imageSrc,
      }),
      DeleteUserButton: new Button({
        className: "chat-user-delete-button",
        label: "Удалить",
        onClick: props.onDeleteUser,
      }),
    })
  }

  override render() {
    return `
      <div class="chat-user-container">
        <div class="chat-user-info-container">
          {{{ UserAvatar }}}
          <h3 class="chat-user-info-login">
            {{ login }}
          </h3>
        </div>
        {{{ DeleteUserButton }}}
      </div>
    `
  }
};
