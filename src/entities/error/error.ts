import Block from "../../framework/Block";
import "./styles.pcss";

type TErrorProps = {
  description: string;
  errorCode: number;
}

export class Error extends Block {
  constructor(props: TErrorProps) {
    super({ ...props });
  }

  override render() {
    return `
      <div class="errorWrapper">
        <div class="errorContainer">
          <h1 class="errorTitle">{{errorCode}}</h1>
          <p class="errorDescription">{{description}}</p>
          <a 
            href="/profile"
            class="errorLink"
          >
            Назад в профиль
          </a>
        </div>
      </div>
    `;
  }
}
