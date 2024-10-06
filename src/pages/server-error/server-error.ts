import { Error } from "../../entities/error";
import Block from "../../framework/Block";

export class ServerErrorPage extends Block {
  constructor() {
    super({
      Error: new Error({
        description: "Мы уже фиксим",
        errorCode: 500,
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
