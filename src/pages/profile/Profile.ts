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
        className: "avatarWrapper",
        iconSrc: PictureFillIcon,
      }),
      ProfileInfoItems: profileInfoItems.map(item => 
        new ProfileInfoItem({...item})
      ),
      EditProfileButton: new Button({
        id: "btnToEdit",
        label: "Изменить данные",
        className: "editButton",
      }),
      EditPassButton: new Button({
        id: "btnToEditPass",
        label: "Изменить пароль",
        className: "editButton",
      }),
      LogOutButton: new Button({
        id: "btnToAuth",
        label: "Выйти",
        className: "logoutButton",
      }),
    })
  }

  override render() {
      return `
        <main>
          <div class="profileInfoWrapper">
            <div class="profileInfoContainer">
                {{{ UserAvatar }}}
                <h1 class="userName">{{userName}}</h1>
  
                {{{ ProfileInfoItems }}}
  
              <div class="footerContainer">
                <div class="editButtonWrapper">
                  {{{ EditProfileButton }}}
                </div>
                <div class="editButtonWrapper">
                  {{{ EditPassButton }}}
                </div>
                {{{ LogOutButton }}}
              </div>
  
              <a href="/home" class="navLink">Назад</a>
            </div>
          </div>
        </main>
      `;
  }
};
