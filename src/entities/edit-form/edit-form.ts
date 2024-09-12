import "./styles.pcss";

export const EditForm = `
  <div class="editFormContainer">
    {{#if title}}
      <h1 class="editFormtitle">{{title}}</h1>
    {{/if}}
    {{#each fields}}
      {{> ProfileInfoItem label=this.label data=this.data }}
    {{/each}}
    
    <a href="/profile">{{> Button 
      label=submitButton
      className="submitButton"
    }}</a>

    <a href="/profile">{{> Button 
      label=cancelButton
      className="cancelButton"
    }}</a>
  </div>
`;
