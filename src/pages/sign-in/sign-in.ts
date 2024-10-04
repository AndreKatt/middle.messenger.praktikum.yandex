import { signInFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";
import App from "../../App";

export class SignInPage extends Block {
  protected appService = new App();

  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Вход",
        formId: "signInForm",
        AuthFields: signInFields,
        submitButtonLabel: "Войти",
        SignButton: {
          label: "Нет аккаунта?",
          onClick: () => this.appService.ChangePage("/signUp"),
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
