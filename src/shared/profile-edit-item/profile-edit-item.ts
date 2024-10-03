import Block from "../../framework/Block";
import "./styles.pcss";

type TProfileEditItemProps = {
  label: string;
  value?: string;
  type: string;
  fieldName: string;
}

export class ProfileEditItem extends Block {
  constructor(props: TProfileEditItemProps) {
    super({ 
      ...props,
      value: props.value || '',
    });
  }

  override render() {
    return `
      <div class="profileEditItemContainer">
        <label>{{label}}</label>
        <input 
          class="editProfileInput" 
          type={{type}}
          name={{fieldName}}
          value={{value}}
        />
        </p>
      </div>
    `;
  }
};
