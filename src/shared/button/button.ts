import Block from "../../framework/Block";

type TButtonProps = {
  label?: string;
  buttonIconSrc?: string;
  alt?: string;
  className: string;
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: TButtonProps) {
    super({ 
      ...props,
      events: {
        click: (e: Event) => props?.onClick?.(e)
      },
     });
  }

  override render() {
    return `
      <button class={{className}}>
        {{#if label}}
          {{label}}
        {{/if}}
        
        {{#if buttonIconSrc}}
          <img src={{buttonIconSrc}} alt={{alt}} />
        {{/if}}
      </button>
    `;
  }
};
