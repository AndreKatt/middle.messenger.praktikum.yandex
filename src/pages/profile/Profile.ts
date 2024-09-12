import './styles.pcss';

export const ProfilePage = `
  <div class='profileInfoWrapper'>
    <div class='profileInfoContainer'>
      {{#if imageSrc}}
        {{> Avatar imageSrc=imageSrc className="avatarWrapper" }}
      {{else}}
        {{> Avatar imageSrc="src/assets/PictureFill.svg" className="avatarWrapper" }}
      {{/if}}

      <h1 class='userName'>{{name}}</h1>

      {{#each infoItems}}
        {{> ProfileInfoItem label=this.label data=this.data }}
      {{/each}}

      <div class='footerContainer'>
        <div class='buttonLinkWrapper'>
          <a href="/edit">
            {{> Button
              label=editData
              className='buttonLink'
            }}
          </a>
        </div>
        <div class='buttonLinkWrapper'>
          <a href="/editPassword">
            {{> Button
              label=editPass
              className='buttonLink'
            }}
          </a>
        </div>
        <a href="/auth">
          {{> Button 
            label=logOut 
            className='logoutButton'
          }}
        </a>
      </div>

      <a href="/home" class='navLink'>Назад</a>
    </div>
  </div>
`;
