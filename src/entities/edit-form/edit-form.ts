import { UserAvatar } from "../user-avatar";
import { Button } from "../../shared/button";
import { ProfileEditItem } from "../../shared/profile-edit-item";
import Block from "../../framework/Block";
import App from "../../App";
import "./styles.pcss";

type TEditFormProps = {
  avatarImageSrc?: string;
  avatarIconSrc: string;
  ProfileEditItems: {
    label: string;
    value?: string;
    fieldName: string;
    type: string;
  }[]
  submitButtonLabel: string;
  cancelButtonLabel: string;
  formId: string;
}

export class EditForm extends Block {
  protected appService = new App();

  constructor(props: TEditFormProps) {
    super({ 
      ...props,
      UserAvatar: new UserAvatar({
        className: "edit-profile-avatar-wrapper",
        iconSrc: props.avatarIconSrc,
        imageSrc: props.avatarImageSrc,
      }),
      ProfileEditItems: props.ProfileEditItems.map(field => 
        new ProfileEditItem({ ...field })
      ),
      SubmitButton: new Button({
        label: props.submitButtonLabel,
        className: "submit-button",
        onClick: () => {
          const form = document.getElementById(`${props.formId}`) as HTMLFormElement;
          const formData = new FormData(form);
          props.ProfileEditItems.forEach(field => {
            console.log(`${field.label}: ${formData.get(field.fieldName)}`)
          });
          this.appService.ChangePage("/profile");
        },

      }),
      CancelButton: new Button({
        label: props.cancelButtonLabel,
        className: "cancel-button",
        onClick: () => this.appService.ChangePage("/profile"),
      }),
    });
  }

  override render() {
    return `
      <div class="edit-form-container">
        {{{ UserAvatar }}}

        <form id={{formId}}>
          {{{ ProfileEditItems }}}
        </form>
        
        {{{ SubmitButton }}}

        {{{ CancelButton }}}
      </div>
    `;
  }
};

