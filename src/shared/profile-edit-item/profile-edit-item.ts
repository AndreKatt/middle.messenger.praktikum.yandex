import "./styles.pcss";

export const ProfileEditItem = `
  <div class="profileEditItemContainer">
    <label>{{label}}</label>
    {{#if value}}
      <input 
        class="editProfileInput" 
        type={{type}}
        name={{fieldName}}
        value={{value}}
      />
    {{else}}
      <input 
        class="editProfileInput" 
        type={{type}}
        name={{fieldName}}
      />
    {{/if}}
    </p>
  </div>
`;
