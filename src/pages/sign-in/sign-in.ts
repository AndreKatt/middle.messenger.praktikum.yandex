import { signInFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";

export class SignInPage extends Block {
  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Вход",
        AuthFields: signInFields,
        submitButtonLabel: "Войти",
        SignButton: {
          id: "btnToSignUp",
          label: "Нет аккаунта?",
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
