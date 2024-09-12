const profileInfoItems = [
  {
    data: "pochta@yandex.ru",
    label: "Почта",
  },
  {
    data: "marina_name",
    label: "Логин",
  },
  {
    data: "Марина",
    label: "Имя",
  },
  {
    data: "Фамильная",
    label: "Фамилия",
  },
  {
    data: "mArInChIk",
    label: "Имя в чате",
  },
  {
    data: "+7 (999) 999 99 99",
    label: "Телефон",
  },
];

const signUpFields = [
  {
    label: "Почта",
    fieldName: "email",
  },
  {
    label: "Логин",
    fieldName: "login"
  },
  {
    label: "Имя",
    fieldName: "first_name"
  },
  {
    label: "Фамилия",
    fieldName: "second_name"
  },
  {
    label: "Телефон",
    fieldName: "phone"
  },
  {
    label: "Пароль",
    fieldName: "password"
  },
  {
    label: "Пароль (ещё раз)",
    fieldName: "password"
  },
];

export const signInTemplateProps = {
  fields: [
    {
      label: "Логин",
      fieldName: "login"
    },
    {
      label: "Пароль",
      fieldName: "password",
    },
  ],
  submitButtonLabel: "Войти",
  signButton: {
    label: "Нет аккаунта?",
    link: "/signUp"
  },
};

export const signUpTemplateProps = {
  fields: signUpFields,
  submitButtonLabel: "Зарегистрироваться",
  signButton: {
    label: "Войти",
    link: "/auth"
  },
};

export const homeTemplateProps = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  time: "10:34",
  countNewMessages: 3,
};

export const profileTemplateProps = {
  infoItems: profileInfoItems,
  name: profileInfoItems[2].data,
  editData: "Изменить данные",
  editPass: "Изменить пароль",
  logOut: "Выйти",
};

export const editProfileTemplateProps = {
  fields: [
    {
      label: "Имя",
      fieldName: "first_name",
      data: "Марина",
    },
    {
      label: "Фамилия",
      fieldName: "second_name",
      data: "Фамильная",
    },
    {
      label: "Имя в чате",
      fieldName: "display_name",
      data: "mArInChIk",
    },
    {
      label: "Логин",
      fieldName: "login",
      data: "marina_name",
    },
    {
      label: "Почта",
      fieldName: "email",
      data: "pochta@yandex.ru",
    },
    {
      label: "Телефон",
      fieldName: "phone",
      data: "+7 (999) 999 99 99",
    },
  ],
  submitButton: "Сохранить",
  cancelButton: "Отмена",
};

export const editPassTemplateProps = {
  fields: [
    {
      label: "Старый пароль",
      fieldName: "oldPassword",
    },
    {
      label: "Новый пароль",
      fieldName: "newPassword"
    },
    {
      label: "Повторите новый пароль",
      fieldName: "newPassword"
    },
  ],
  submitButton: "Сохранить",
  cancelButton: "Отмена",
};
// oldPassword, newPassword