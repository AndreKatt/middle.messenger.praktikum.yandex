import { signUpFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";
import App from "../../App";

export class SignUpPage extends Block {
  protected appService = new App();

  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Регистрация",
        formId: "signUpForm",
        AuthFields: signUpFields,
        submitButtonLabel: "Зарегистрироваться",
        SignButton: {
          label: "Войти",
          onClick: () => this.appService.ChangePage("/auth"),
        }
      })
    });
  }

  override render() {
    return `
      <main>
        {{{ AuthForm }}}
      </main>
    `;
  }
};
