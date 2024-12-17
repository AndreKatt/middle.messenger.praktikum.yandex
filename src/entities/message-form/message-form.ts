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
            const input = e.target as HTMLInputElement;

            if (!!input.value) {
              props.onSubmit();
            }
          }
        },
        submit: (e: SubmitEvent) => {
          e.preventDefault()
          return false;
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
