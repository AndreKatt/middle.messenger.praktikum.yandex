import './styles.pcss';

export const AuthForm = `
  <div class='formWrapper'>
    <div class='formContainer'>
      <div class='contentContainer'>
        {{#if title}}
          <h1 class='title'>{{title}}</h1>
        {{/if}}
    
        {{#each fields}}
          {{> Input 
            label=this.label 
            name=this.fieldName
            containerClassName='fieldContainer'
            labelClassName='fieldLabel'
            inputClassName='fieldInput'
          }}
        {{/each}}
      </div>
      
      <div class='authFooterContainer'>
        <a href="/profile">
          {{> Button 
            label=submitButtonLabel
            className='submitButton'
          }}
        </a>
        <a href={{signButton.link}}>
          {{> Button 
            label=signButton.label
            className='signButton'
          }}
        </a>
      </div>
    </div>
  </div>
`;
