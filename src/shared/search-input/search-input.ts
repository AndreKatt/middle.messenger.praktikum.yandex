import Block from "../../framework/Block";

type TInputProps = {
  className: string;
  onInput: (login: string) => Promise<void>;
}

export class SearchInput extends Block {
  constructor(props: TInputProps) {
    super({
      ...props,
      events: {
        input: (e: Event) => {
          const input = e.target as HTMLInputElement;
          props.onInput(input.value)
        },
      }
    });
  }

  override render() {
    return `
      <input 
        type="search" 
        placeholder="Поиск" 
        class={{ className }}
      />
    `;
  }
};
