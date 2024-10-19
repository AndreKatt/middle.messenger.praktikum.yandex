import { Avatar } from "../../shared/avatar";
import Block from "../../framework/Block";

type TUserAvatarProps = {
  imageSrc?: string;
  iconSrc: string;
  className: string;
}

export class UserAvatar extends Block {
  constructor(props: TUserAvatarProps) {
    super({ 
      ...props,
      Avatar: new Avatar({
        imageSrc: props.imageSrc ? props.imageSrc : props.iconSrc,
        className: props.className,
      })
    });
  }

  override render() {
    return `{{{ Avatar }}}`;
  }
};
