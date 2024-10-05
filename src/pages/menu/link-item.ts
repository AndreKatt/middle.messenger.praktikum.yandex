import Block from "../../framework/Block";

type TLinkItemProps = {
  url: string;
  title: string
};

export class LinkItem extends Block {
  constructor(props: TLinkItemProps) {
    super({ ...props })
  }

  override render() {
    return `
      <a href={{url}}>
        <li class="menuListItem">
          {{title}}
        </li>
      </a>
    `;
  }
} 
