export const UserAvatar = `
  {{#if imageSrc}}
    {{> Avatar imageSrc=imageSrc className=className }}
  {{else}}
    {{> Avatar imageSrc=iconSrc className=className }}
  {{/if}}
`;
