import Block from "../../framework/Block";
import "./styles.pcss";

type TProfileInfoItemProps = {
  label: string;
  data: string;
}

export class ProfileInfoItem extends Block {
  constructor(props: TProfileInfoItemProps) {
    super({ ...props });
  }

  override render() {
    return `
      <div class="profile-info-item-container">
        <p>{{label}}</p>
        <p class="item-text">{{data}}</p>
      </div>
    `;
  }
};
