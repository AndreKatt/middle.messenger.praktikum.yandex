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
  },
  {
    label: "Логин",
    inputName: "login"
  },
  {
    label: "Имя",
    inputName: "first_name"
  },
  {
    label: "Фамилия",
    inputName: "second_name"
  },
  {
    label: "Телефон",
    inputName: "phone"
  },
  {
    label: "Пароль",
    inputName: "password"
  },
  {
    label: "Пароль (ещё раз)",
    inputName: "password"
  },
];

export const signInFields = [
  {
    label: "Логин",
    inputName: "login"
  },
  {
    label: "Пароль",
    inputName: "password",
  },
];

export const editProfileFields = [
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
];

export const editPassFields = [
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
