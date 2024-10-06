import { signInFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";

export class SignInPage extends Block {
  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Вход",
        formId: "signInForm",
        AuthFields: signInFields,
        submitButtonLabel: "Войти",
        SignButton: {
          label: "Нет аккаунта?",
          onClick: () => this.AppService.ChangePage("/signUp"),
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
