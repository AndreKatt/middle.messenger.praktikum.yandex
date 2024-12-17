import { Avatar } from "../../shared/avatar";
import Block from "../../framework/Block";

type TUserAvatarProps = {
  imageSrc?: string;
  iconSrc: string;
  className: string;
  onClick?: () => void;
}

export class UserAvatar extends Block {
  constructor(props: TUserAvatarProps) {
    super({ 
      ...props,
      Avatar: new Avatar({
        imageSrc: props.imageSrc ? props.imageSrc : props.iconSrc,
        className: props.className,
      }),
      events: {
        click: () => props?.onClick?.(),
      },
    });
  }

  override render() {
    return `{{{ Avatar }}}`;
  }
};
