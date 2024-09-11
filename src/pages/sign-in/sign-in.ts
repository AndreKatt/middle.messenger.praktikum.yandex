export const SignInPage = `<div>
  <h1>Вход</h1>
  {{> Input label=login }}
  {{> Input label=password }}
  
  <a href='/profile'>
    {{> Button label=submitButtonLabel }}
  </a>
  <a href='/signUp'>
    {{> Button label=signUpButtonLabel }}
  </a>
</div>`;
