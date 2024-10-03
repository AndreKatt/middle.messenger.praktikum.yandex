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
      <div class="error-wrapper">
        <div class="error-container">
          <h1 class="error-title">{{errorCode}}</h1>
          <p class="error-description">{{description}}</p>
          <a 
            href="/profile"
            class="error-link"
          >
            Назад в профиль
          </a>
        </div>
      </div>
    `;
  }
}
