export const HomePage = `
  <div>
    <div>
      <div>
        <a href="/profile">Профиль</a>
        <input placeholder="Поиск"/>
      </div>
      <div>
        {{> MessagePreview 
          text=text 
          time=time 
          countNewMessages=countNewMessages
        }}
      </div>
    </div>
    <div>
      Выберите чат чтобы отправить сообщение
    </div>
  </div>
`;
