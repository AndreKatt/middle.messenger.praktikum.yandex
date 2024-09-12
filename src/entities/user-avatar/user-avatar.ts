export const UserAvatar = `
  {{#if imageSrc}}
    {{> Avatar imageSrc=imageSrc className=className }}
  {{else}}
    {{> Avatar imageSrc="src/assets/PictureFill.svg" className=className }}
  {{/if}}
`;
