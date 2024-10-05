import { menuLinkItems } from '../../assets';
import Block from '../../framework/Block';
import { LinkItem } from './link-item';
import './styles.pcss';

export class MenuPage extends Block {
  constructor() {
    super({
      LinkItems: menuLinkItems.map(link => 
        new LinkItem(link)
      ),
    })
  }

  override render() {
    return `
      <div class="menuContainer">
        <h1>Меню</h1>
        <ul class="menuList">
          {{{ LinkItems }}}
        </ul>
      </div>
    `;
  }
};
