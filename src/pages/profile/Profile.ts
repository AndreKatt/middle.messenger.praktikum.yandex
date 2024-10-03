import { UserAvatar } from "../../entities/user-avatar";
import { profileInfoItems } from "../../assets";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";
import { ProfileInfoItem } from "../../shared/profile-info-item";
import { Button } from "../../shared/button";

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
        id: "btnToEdit",
        label: "Изменить данные",
        className: "edit-button",
      }),
      EditPassButton: new Button({
        id: "btnToEditPass",
        label: "Изменить пароль",
        className: "edit-button",
      }),
      LogOutButton: new Button({
        id: "btnToAuth",
        label: "Выйти",
        className: "logout-button",
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
