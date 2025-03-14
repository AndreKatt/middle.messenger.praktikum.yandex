import { signUpFields } from "../../assets";
import { AuthForm } from "../../features/auth-form";
import { Routes } from "../../framework/Router";
import Block from "../../framework/Block";

export class SignUpPage extends Block {
  constructor() {
    super({
      AuthForm: new AuthForm({
        formType: "signup",
        title: "Регистрация",
        formId: "signUpForm",
        AuthFields: signUpFields,
        submitButtonLabel: "Зарегистрироваться",
        SignButton: {
          label: "Войти",
          onClick: () => this.RouterService.go(Routes.AUTH),
        },
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
