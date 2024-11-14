import Block from "../../framework/Block";

type TMessageFormProps = {
  formId: string;
  onSubmit: () => void;
}

export class MessageForm extends Block {
  constructor(props: TMessageFormProps) {
    super({
      ...props,
      events: {
        keypress: (e: KeyboardEvent) => {
          if (e.code === "Enter") {
            e.preventDefault();
            const input = e.target as HTMLInputElement;

            if (!!input.value) {
              props.onSubmit();
            }
          }
        }
      }
    });
  }

  override render() {
    return `
      <form id={{formId}}>
        <input 
          id="message"
          class="chat-message-input"
          placeholder="Сообщение"
          name="message"
        />
      </form>
    `
  }
};
