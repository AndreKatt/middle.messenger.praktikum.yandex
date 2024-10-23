import { validate } from "../../utils/validate";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { Routes } from "../../framework/Router";
import Block from "../../framework/Block";
import "./styles.pcss";

type TAuthFormProps = {
  title?: string;
  formId: string;
  AuthFields: {
    label: string;
    inputName: string;
    inputId: string;
  }[];
  submitButtonLabel: string;
  SignButton: {
    label: string;
    onClick: () => void;
  }
}

export class AuthForm extends Block {
  constructor(props: TAuthFormProps) {
    super({ 
      ...props,
      AuthFields: props.AuthFields.map((field, idx) => 
        new Input({ 
          ...field,
          containerClassName: "field-container",
          labelClassName: "field-label",
          inputClassName: "field-input",
          onBlur: () => {
            const input = document.getElementById(field.inputId) as HTMLInputElement;
            const errMessage = validate(field.inputName, input.value as string, true);
            const fieldEl = this.lists.AuthFields[idx] as Input;

            if (errMessage) {
              fieldEl.setProps({
                error: errMessage,
                inputClassName: "field-input-error",
              });

              return;
            }
            fieldEl.setProps({
              error: undefined,
              inputClassName: "field-input",
            })
          }
        })
      ),
      SubmitButton: new Button({
        label: props.submitButtonLabel,
        className: "auth-submit-button",
        onClick: () => {
          let hasErrors = false;
          const form = document.getElementById(`${props.formId}`) as HTMLFormElement;
          const formData = new FormData(form);

          props.AuthFields.forEach((field, idx) => {
            const fieldValue = formData.get(field.inputName);
            const errMessage = validate(field.inputName, fieldValue as string, true);
            if (errMessage) {
              hasErrors = true;
              const field = this.lists.AuthFields[idx] as Input;
              field.setProps({
                error: errMessage,
                inputClassName: "field-input-error",
              });
              return;
            }
            console.log(`${field.inputName}: ${fieldValue}`);
          });

          if (hasErrors) return;

          this.RouterService.go(Routes.PROFILE)
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
