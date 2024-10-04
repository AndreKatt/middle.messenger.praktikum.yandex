import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import Block from "../../framework/Block";
import App from "../../App";
import "./styles.pcss";

type TAuthFormProps = {
  title?: string;
  formId: string;
  AuthFields: {
    label: string;
    inputName: string;
  }[];
  submitButtonLabel: string;
  SignButton: {
    label: string;
    onClick: () => void;
  }
}

export class AuthForm extends Block {
  protected appService = new App();

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
        label: props.submitButtonLabel,
        className: "auth-submit-button",
        onClick: () => {
          const form = document.getElementById(`${props.formId}`) as HTMLFormElement;
          const formData = new FormData(form);
          props.AuthFields.forEach(field => {
            console.log(`${field.label}: ${formData.get(field.inputName)}`)
          });
          this.appService.ChangePage("/profile")
        },
      }),
      SignButton: new Button({
        ...props.SignButton,
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

            <form id={{formId}}>
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
