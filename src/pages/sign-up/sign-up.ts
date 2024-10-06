import { signUpFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";

export class SignUpPage extends Block {
  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Регистрация",
        formId: "signUpForm",
        AuthFields: signUpFields,
        submitButtonLabel: "Зарегистрироваться",
        SignButton: {
          label: "Войти",
          onClick: () => this.AppService.ChangePage("/auth"),
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
