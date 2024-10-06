import { Error } from "../../entities/error";
import Block from "../../framework/Block";

export class NotFoundPage extends Block {
  constructor() {
    super({
      Error: new Error({
        description: "Не туда попали",
        errorCode: 404,
      }),
    });
  }

  override render() {
    return `
      <main>
        {{{ Error }}}
      </main>
    `;
  }
}
