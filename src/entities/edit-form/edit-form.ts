import { validate } from "../../utils/validate";
import { UserAvatar } from "../user-avatar";
import { Button } from "../../shared/button";
import { ProfileEditItem } from "../../shared/profile-edit-item";
import { Input } from "../../shared/input";
import Block from "../../framework/Block";
import "./styles.pcss";

type TEditFormProps = {
  avatarImageSrc?: string;
  avatarIconSrc: string;
  ProfileEditItems: {
    label: string;
    value?: string;
    fieldName: string;
    type: string;
    inputId: string;
  }[]
  submitButtonLabel: string;
  cancelButtonLabel: string;
  formId: string;
}

export class EditForm extends Block {
  constructor(props: TEditFormProps) {
    super({ 
      ...props,
      UserAvatar: new UserAvatar({
        className: "edit-profile-avatar-wrapper",
        iconSrc: props.avatarIconSrc,
        imageSrc: props.avatarImageSrc,
      }),
      ProfileEditItems: props.ProfileEditItems.map((field, idx) => 
        new ProfileEditItem({ 
          ...field,
          inputClassName: "edit-profile-input",
          onBlur: () => {
            const input = document.getElementById(field.inputId) as HTMLInputElement;
            const errMessage = validate(field.fieldName, input.value as string);
            const fieldEl = this.lists.ProfileEditItems[idx] as Input;

            if (errMessage) {
              fieldEl.setProps({
                error: errMessage,
                inputClassName: "field-input-error",
              });

              return;
            }
            fieldEl.setProps({
              error: undefined,
              inputClassName: "field-input",
            })
          }
        })
      ),
      SubmitButton: new Button({
        label: props.submitButtonLabel,
        className: "submit-button",
        onClick: () => {
          let hasErrors = false;
          const form = document.getElementById(`${props.formId}`) as HTMLFormElement;
          const formData = new FormData(form);

          props.ProfileEditItems.forEach((field, idx) => {
            const fieldValue = formData.get(field.fieldName);
            const errMessage = validate(field.fieldName, fieldValue as string);
            if (errMessage) {
              hasErrors = true;
              const field = this.lists.ProfileEditItems[idx] as Input;
              field.setProps({
                error: errMessage,
                inputClassName: "edit-profile-input-error",
              });

              return;
            }
            console.log(`${field.fieldName}: ${fieldValue}`);
          });

          if (hasErrors) return;

          this.AppService.ChangePage("/profile");
        },

      }),
      CancelButton: new Button({
        label: props.cancelButtonLabel,
        className: "cancel-button",
        onClick: () => this.AppService.ChangePage("/profile"),
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

