import "./styles.pcss";

export const EditForm = `
  <div class="editFormContainer">
    {{> UserAvatar className="editProfileAvatarWrapper" }}

    <form>
      {{#each fields}}
        {{> ProfileEditItem
          label=this.label 
          fieldName=this.fieldName
          value=this.value
          type=this.type
        }}
      {{/each}}
    </form>
    
    {{> Button 
      id="btnToProfile"
      label=submitButton
      className="submitButton"
    }}

    {{> Button
      id="btnToProfile"
      label=cancelButton
      className="cancelButton"
    }}
  </div>
`;
