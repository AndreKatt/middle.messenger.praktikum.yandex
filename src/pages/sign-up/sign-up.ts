import { signUpFields } from "../../assets";
import { AuthForm } from "../../entities/auth-form";
import Block from "../../framework/Block";

export class SignUpPage extends Block {
  constructor() {
    super({
      AuthForm: new AuthForm({
        title: "Регистрация",
        AuthFields: signUpFields,
        submitButtonLabel: "Зарегистрироваться",
        SignButton: {
          id: "btnToAuth",
          label: "Войти",
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
