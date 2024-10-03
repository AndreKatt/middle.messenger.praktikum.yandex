import Block from "../../framework/Block";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import "./styles.pcss";

type TAuthFormProps = {
  title?: string;
  AuthFields: {
    label: string;
    inputName: string;
  }[];
  submitButtonLabel: string;
  SignButton: {
    id: string;
    label: string;
  }
}

export class AuthForm extends Block {
  constructor(props: TAuthFormProps) {
    super({ 
      ...props,
      AuthFields: props.AuthFields.map(field => 
        new Input({ 
          ...field,
          containerClassName: "field-container",
          labelClassName: "field-label",
          inputClassName: "field-input",
        })
      ),
      SubmitButton: new Button({
        id: "btnToProfile",
        label: props.submitButtonLabel,
        className: "auth-submit-button",
      }),
      SignButton: new Button({
        id: props.SignButton.id,
        label: props.SignButton.label,
        className: "sign-button",
      })
    });
  }

  override render() {
    return `
      <div class="auth-form-wrapper">
        <div class="auth-form-container">
          <div class="content-container">
            {{#if title}}
              <h1 class="title">{{title}}</h1>
            {{/if}}

            <form>
            {{{ AuthFields }}}
            </form>
          </div>
          
          <div class="auth-footer-container">
            {{{ SubmitButton }}}
            {{{ SignButton }}}
          </div>
        </div>
      </div>
    `;
  }
};
