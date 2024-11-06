import Block from "../../framework/Block";
import "./styles.pcss";

type TProfileEditItemProps = {
  label: string;
  value?: string;
  type: string;
  fieldName: string;
  error?: string;
  inputClassName: string;
  inputId: string;
  onBlur?: () => void;
}

export class ProfileEditItem extends Block {
  constructor(props: TProfileEditItemProps) {
    super({ 
      ...props,
      value: props.value,
      EditItemField: new EditItemField({ ...props }),
    });
  }

  override render() {
    return `
      <div>
        <div class="profile-edit-item-container">
          <label>{{label}}</label>
          {{{ EditItemField }}}
          </div>
          {{#if error}}
            <p class="edit-error-text">
              {{error}}
            </p>
          {{/if}}
      </div>
    `;
  }
};

class EditItemField extends Block {
  constructor(props: Partial<TProfileEditItemProps>) {
    super({ 
      ...props,
      events: {
        blur: () => {
          props?.onBlur?.();
        }
      }
    });
  }

  override render() {
    return `
      <input
        id={{inputId}}
        class={{inputClassName}}
        type={{type}}
        name={{fieldName}}
        {{#if value}}
          value={{value}}
        {{/if}}
      />
    `
  }
};
