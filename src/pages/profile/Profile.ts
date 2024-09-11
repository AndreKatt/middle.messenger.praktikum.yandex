export const ProfilePage = `
  <div>
    <a href="/home">Назад</a>
    <h1>{{name}}</h1>
    {{#each infoItems}}
      {{> ProfileInfoItem label=this.label data=this.data }}
    {{/each}}
    
    {{> Button label=editData }}
    {{> Button label=editPass }}
    <a href="/auth">{{> Button label=logOut }}</a>
  </div>
`;
