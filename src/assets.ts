const profileInfoItems = [
  {
    data: 'pochta@yandex.ru',
    label: 'Почта',
  },
  {
    data: 'marina_name',
    label: 'Логин',
  },
  {
    data: 'Марина',
    label: 'Имя',
  },
  {
    data: 'Фамильная',
    label: 'Фамилия',
  },
  {
    data: 'mArInChIk',
    label: 'Имя в чате',
  },
  {
    data: '+7 (999) 999 99 99',
    label: 'Телефон',
  },
];

const signUpFields = [
  'Почта',
  'Логин',
  'Имя',
  'Фамилия',
  'Телефон',
  'Пароль',
  'Пароль (ещё раз)',
];

export const signInTemplateProps = {
  login: 'Логин',
  password: 'Пароль',
  submitButtonLabel: 'Авторизоваться',
  signUpButtonLabel: 'Нет аккаунта?',
};

export const signUpTemplateProps = {
  fields: signUpFields,
  submitButtonLabel: 'Зарегистрироваться',
  signInButtonLabel: 'Войти',
};

export const homeTemplateProps = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  time: '10:34',
  countNewMessages: 3,
};

export const profileTemplateProps = {
  infoItems: profileInfoItems,
  name: profileInfoItems[2].data,
  editData: 'Изменить данные',
  editPass: 'Изменить пароль',
  logOut: 'Выйти',
};
