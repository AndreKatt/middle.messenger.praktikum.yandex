import Block from "../../framework/Block";

type TInputProps = {
  label: string;
  inputName: string;
  containerClassName: string;
  labelClassName: string;
  inputClassName: string;
}

export class Input extends Block {
  constructor(props: TInputProps) {
    super({ ...props });
  }

  override render() {
    return `
      <div class={{containerClassName}}>
        <label class={{labelClassName}}>{{label}}</label>
        <input type="text" name={{inputName}} class={{inputClassName}} />
      </div>
    `;
  }
};
