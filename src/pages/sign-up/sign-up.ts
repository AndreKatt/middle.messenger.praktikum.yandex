export const SignUpPage = `<div>
  <h1>Регистрация</h1>
  {{#each fields}}
    {{> Input label=this }}
  {{/each}}

  <a href='/profile'>
    {{> Button label=submitButtonLabel }}
  </a>
  <a href='/auth'>
    {{> Button label=signInButtonLabel }}
  </a>
</div>`;
