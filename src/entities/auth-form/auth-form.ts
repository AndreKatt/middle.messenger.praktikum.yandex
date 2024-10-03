import "./styles.pcss";

export const AuthForm = `
  <div class="authFormWrapper">
    <div class="authFormContainer">
      <div class="contentContainer">
        {{#if title}}
          <h1 class="title">{{title}}</h1>
        {{/if}}

        <form>
          {{#each fields}}
            {{> Input 
              label=this.label 
              name=this.fieldName
              containerClassName="fieldContainer"
              labelClassName="fieldLabel"
              inputClassName="fieldInput"
            }}
          {{/each}}
        </form>
      </div>
      
      <div class="authFooterContainer">
        {{> Button 
          id="btnToProfile"
          label=submitButtonLabel
          className="authSubmitButton"
        }}
        {{> Button 
          id=signButton.id
          label=signButton.label
          className="signButton"
        }}
      </div>
    </div>
  </div>
`;
