import Block from "../../framework/Block";

type TButtonProps = {
  id?: string;
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
      attr: {
        id: props.id,
      }
     });
  }

  override render() {
    return `
      {{#if id}}
        <button id={{id}} class={{className}}>
          {{#if label}}
            {{label}}
          {{/if}}
          
          {{#if buttonIconSrc}}
            <img src={{buttonIconSrc}} alt={{alt}} />
          {{/if}}
        </button>
      {{else}}
        <button class={{className}}>
          {{#if label}}
            {{label}}
          {{/if}}
          
          {{#if buttonIconSrc}}
            <img src={{buttonIconSrc}} alt={{alt}} />
          {{/if}}
        </button>
      {{/if}}
    `;
  }
};
