import './styles.pcss';

export const ProfilePage = `
  <div class='profileInfoWrapper'>
    <div class='profileInfoContainer'>
      <h1 class='title'>{{name}}</h1>

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
