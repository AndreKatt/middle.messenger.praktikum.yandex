import Block from "../../framework/Block";
import "./styles.pcss";

type TInputProps = {
  inputId?: string;
  label: string;
  inputName: string;
  containerClassName: string;
  labelClassName: string;
  inputClassName: string;
  error?: string;
  onBlur?: () => void;
}

export class Input extends Block {
  constructor(props: TInputProps) {
    super({ 
      ...props,
      InputField: new InputField({ ...props }),
    });
  }

  override render() {
    return `
      <div class={{containerClassName}}>
        <label class={{labelClassName}}>{{label}}</label>
        {{{ InputField }}}
        {{#if error}}
          <p class="error-text">
            {{ error }}
          </p>
        {{/if}}
      </div>
    `;
  }
};

class InputField extends Block {
  constructor(props: Partial<TInputProps>) {
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
        type="text" 
        name={{inputName}} 
        class={{inputClassName}}
      />
    `
  }
};
