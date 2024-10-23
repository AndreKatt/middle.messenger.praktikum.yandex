import { UserAvatar } from "../../entities/user-avatar";
import { profileInfoItems } from "../../assets";
import { ProfileInfoItem } from "../../shared/profile-info-item";
import { Button } from "../../shared/button";
import { Routes } from "../../framework/Router";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";

export class ProfilePage extends Block {
  constructor() {
    super({
      userName: profileInfoItems[2].data,
      UserAvatar: new UserAvatar({
        className: "avatar-wrapper",
        iconSrc: PictureFillIcon,
      }),
      ProfileInfoItems: profileInfoItems.map(item => 
        new ProfileInfoItem({...item})
      ),
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
        onClick: () => this.RouterService.go(Routes.AUTH),
      }),
    })
  }

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
  
              <a href="/home" class="nav-link">Назад</a>
            </div>
          </div>
        </main>
      `;
  }
};
