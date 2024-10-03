import Block from "../../framework/Block";
import "./styles.pcss";

type TAvatarProps = {
  imageSrc: string;
  className: string;
}

export class Avatar extends Block {
  constructor(props: TAvatarProps) {
    super({ ...props });
  }

  override render() {
    return `
      <div class={{className}}>
        <div class="avatarContainer">
          <img src={{imageSrc}} alt="аватарка" />
        </div>
      </div>
    `;
  }
};
