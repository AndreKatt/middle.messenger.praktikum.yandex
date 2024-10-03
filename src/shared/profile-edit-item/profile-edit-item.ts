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
      <div class="profile-edit-item-container">
        <label>{{label}}</label>
        <input 
          class="edit-profile-input" 
          type={{type}}
          name={{fieldName}}
          value={{value}}
        />
        </p>
      </div>
    `;
  }
};
