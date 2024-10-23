import { signInFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import { Routes } from "../../framework/Router";
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
          onClick: () => this.RouterService.go(Routes.SIGN_UP),
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
