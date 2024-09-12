import './styles.pcss';

export const Error = `
  <div class='errorWrapper'>
    <div class='errorContainer'>
      <h1 class='errorTitle'>{{errorCode}}</h1>
      <p class='errorDescription'>{{description}}</p>
      <a 
        href='/home'
        class='errorLink'
      >
        Назад к чатам
      </a>
    </div>
  </div>
`;
