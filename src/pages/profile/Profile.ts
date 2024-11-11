import { UserAvatar } from "../../entities/user-avatar";
import { ProfileInfoItem } from "../../shared/profile-info-item";
import { Button } from "../../shared/button";
import { Routes } from "../../framework/Router";
import { ProfileService } from "./profile.service";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";
import { getAvatarSrc } from "../../utils/getEndPoint";

type TUserData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
}

const getProfileInfoItems = (data: TUserData) => [
  {
    data: data.email,
    label: "Почта",
  },
  {
    data: data.login,
    label: "Логин",
  },
  {
    data: data.first_name,
    label: "Имя",
  },
  {
    data: data.second_name,
    label: "Фамилия",
  },
  {
    data: data.display_name,
    label: "Имя в чате",
  },
  {
    data: data.phone,
    label: "Телефон",
  }
];

export class ProfilePage extends Block {
  protected readonly profileService = new ProfileService();

  constructor() {
    super({
      UserAvatar: new UserAvatar({
        className: "avatar-wrapper",
        iconSrc: PictureFillIcon,
      }),
      EditProfileButton: new Button({
        label: "Изменить данные",
        className: "edit-button",
        onClick: () => this.RouterService.go(Routes.SETTINGS),
      }),
      EditPassButton: new Button({
        label: "Изменить пароль",
        className: "edit-button",
        onClick: () => this.RouterService.go(Routes.PASSWORD_SETTINGS),
      }),
      LogOutButton: new Button({
        label: "Выйти",
        className: "logout-button",
        onClick: async () => {
          const result = await this.profileService.LogOut();

          if (result === 200) {
            sessionStorage.removeItem("id");
            this.RouterService.go(Routes.AUTH)
          }
        }
      }),
    });

    setTimeout(async () => {
      const result = await this.profileService.GetUser();

      if (!result) {
        return;
      }
  
      if (result.status === 200) {
        const data = JSON.parse(result.response);
        const profileInfoItems = getProfileInfoItems(data);

        this.setProps({
          userName: data.first_name,
          UserAvatar: new UserAvatar({
            className: data.avatar ? "avatar-wrapper" : "avatar-placeholder-wrapper",
            iconSrc: PictureFillIcon,
            imageSrc: getAvatarSrc(data.avatar),
          }),
          ProfileInfoItems: profileInfoItems.map(item => 
            new ProfileInfoItem(item)
          ),
        })
      } else if (result.status === 401) {
        this.RouterService.go(Routes.AUTH);
      }
    });
  };

  override render() {
    return `
      <main>
        <div class="profile-info-wrapper">
          <div class="profile-info-container">
              {{{ UserAvatar }}}
              <h1 class="user-name">{{userName}}</h1>

              {{{ ProfileInfoItems }}}

            <div class="footer-container">
              <div class="edit-button-wrapper">
                {{{ EditProfileButton }}}
              </div>
              <div class="edit-button-wrapper">
                {{{ EditPassButton }}}
              </div>
              {{{ LogOutButton }}}
            </div>

            <a href="/messenger" class="nav-link">Назад к чатам</a>
          </div>
        </div>
      </main>
    `;
  }
};
