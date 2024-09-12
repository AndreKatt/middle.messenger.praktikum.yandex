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
    id: "btnToSignUp",
    label: "Нет аккаунта?",
  },
};

export const signUpTemplateProps = {
  fields: signUpFields,
  submitButtonLabel: "Зарегистрироваться",
  signButton: {
    label: "Войти",
    id: "btnToAuth"
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
      value: "Марина",
      type: "text",
    },
    {
      label: "Фамилия",
      fieldName: "second_name",
      value: "Фамильная",
      type: "text",
    },
    {
      label: "Имя в чате",
      fieldName: "display_name",
      value: "mArInChIk",
      type: "text",
    },
    {
      label: "Логин",
      fieldName: "login",
      value: "marina_name",
      type: "text",
    },
    {
      label: "Почта",
      fieldName: "email",
      value: "pochta@yandex.ru",
      type: "email",
    },
    {
      label: "Телефон",
      fieldName: "phone",
      value: "+7(999)999-99-99",
      type: "text",
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
      type: "password",
    },
    {
      label: "Новый пароль",
      fieldName: "newPassword",
      type: "password",
    },
    {
      label: "Повторите новый пароль",
      fieldName: "newPassword",
      type: "password",
    },
  ],
  submitButton: "Сохранить",
  cancelButton: "Отмена",
};
