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
      // maps
      AuthFields: props.AuthFields.map(field => 
        new Input({ 
          ...field,
          containerClassName: "fieldContainer",
          labelClassName: "fieldLabel",
          inputClassName: "fieldInput",
        })
      ),
      SubmitButton: new Button({
        id: "btnToProfile",
        label: props.submitButtonLabel,
        className: "authSubmitButton",
      }),
      SignButton: new Button({
        id: props.SignButton.id,
        label: props.SignButton.label,
        className: "signButton",
      })
    });
  }

  override render() {
    return `
      <div class="authFormWrapper">
        <div class="authFormContainer">
          <div class="contentContainer">
            {{#if title}}
              <h1 class="title">{{title}}</h1>
            {{/if}}

            <form>
            {{{ AuthFields }}}
            </form>
          </div>
          
          <div class="authFooterContainer">
            {{{ SubmitButton }}}
            {{{ SignButton }}}
          </div>
        </div>
      </div>
    `;
  }
};
