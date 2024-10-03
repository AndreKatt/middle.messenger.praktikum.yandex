import "./styles.pcss";

export const ProfilePage = `
  <main>
    <div class="profileInfoWrapper">
      <div class="profileInfoContainer">
          {{> UserAvatar className="avatarWrapper"}}

          <h1 class="userName">{{name}}</h1>

          {{#each infoItems}}
            {{> ProfileInfoItem label=this.label data=this.data }}
          {{/each}}

        <div class="footerContainer">
          <div class="editButtonWrapper">
            {{> Button
              id="btnToEdit"
              label=editData
              className="editButton"
            }}
          </div>
          <div class="editButtonWrapper">
            {{> Button
              id="btnToEditPass"
              label=editPass
              className="editButton"
            }}
          </div>
            {{> Button
              id="btnToAuth"
              label=logOut 
              className="logoutButton"
            }}
        </div>

        <a href="/home" class="navLink">Назад</a>
      </div>
    </div>
  </main>
`;
