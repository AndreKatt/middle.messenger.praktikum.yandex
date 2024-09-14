import './styles.pcss';

export const MenuPage = `
  <div class="menuContainer">
    <h1>Меню</h1>
    <ul class="menuList">
      {{> LinkItem url="/auth" title="Войти"}}
      {{> LinkItem url="/signUp" title="Зарегистрироваться"}}
      {{> LinkItem url="/home" title="Чаты"}}
      {{> LinkItem url="/profile" title="Профиль"}}
      {{> LinkItem url="/edit" title="Изменить данные"}}
      {{> LinkItem url="/editPassword" title="Изменить пароль"}}
      {{> LinkItem url="/404" title="Not Found"}}
      {{> LinkItem url="/error" title="Server Error"}}
    </ul>
  </div>
`;
