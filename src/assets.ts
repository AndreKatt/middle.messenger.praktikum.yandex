import PictureFillIcon from "./assets/PictureFill.svg";

export const profileInfoItems = [
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

export const signUpFields = [
  {
    label: "Почта",
    inputName: "email",
    inputId: "email",
  },
  {
    label: "Логин",
    inputName: "login",
    inputId: "login",
  },
  {
    label: "Имя",
    inputName: "first_name",
    inputId: "first_name",
  },
  {
    label: "Фамилия",
    inputName: "second_name",
    inputId: "second_name",
  },
  {
    label: "Телефон",
    inputName: "phone",
    inputId: "phone",
  },
  {
    label: "Пароль",
    inputName: "password",
    inputId: "password",
  },
  {
    label: "Пароль (ещё раз)",
    inputName: "password",
    inputId: "password2",
  },
];

export const signInFields = [
  {
    label: "Логин",
    inputName: "login",
    inputId: "login",
  },
  {
    label: "Пароль",
    inputName: "password",
    inputId: "password",
  },
];

export const editProfileFields = [
  {
    label: "Имя",
    fieldName: "first_name",
    value: "Марина",
    type: "text",
    inputId: "first_name",
  },
  {
    label: "Фамилия",
    fieldName: "second_name",
    value: "Фамильная",
    type: "text",
    inputId: "second_name",
  },
  {
    label: "Имя в чате",
    fieldName: "display_name",
    value: "mArInChIk",
    type: "text",
    inputId: "display_name",
  },
  {
    label: "Логин",
    fieldName: "login",
    value: "marina_name",
    type: "text",
    inputId: "login",
  },
  {
    label: "Почта",
    fieldName: "email",
    value: "pochta@yandex.ru",
    type: "email",
    inputId: "email",
  },
  {
    label: "Телефон",
    fieldName: "phone",
    value: "+7(999)999-99-99",
    type: "text",
    inputId: "phone",
  },
];

export const editPassFields = [
  {
    label: "Старый пароль",
    fieldName: "oldPassword",
    type: "password",
    inputId: "oldPassword",
  },
  {
    label: "Новый пароль",
    fieldName: "newPassword",
    type: "password",
    inputId: "newPassword",
  },
  {
    label: "Повторите новый пароль",
    fieldName: "newPassword",
    type: "password",
    inputId: "newPassword2",
  },
];

export const chats = [
  {
    userName: 'Андрей',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    time: '12:43',
    newMessagesCount: 2,
    avatarIconSrc: PictureFillIcon,
  },
  {
    userName: 'Bestie',
    message: 'OLOLOlololo azazalolo hahhahah you know :D',
    time: 'Пн',
    newMessagesCount: 0,
    avatarIconSrc: PictureFillIcon,
  }
];

export const selectedChat = [
  {
    text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
    time: "11:56",
    isCurrentUser: false,
  },
  {
    text: "Чел, соре, меня интересуют другие материи",
    time: "12:08",
    isCurrentUser: true,
    isChecked: true,
  }
]
