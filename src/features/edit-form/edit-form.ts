import { validate } from "../../utils/validate";
import { UserAvatar } from "../../entities/user-avatar";
import { Button } from "../../shared/button";
import { ProfileEditItem } from "../../shared/profile-edit-item";
import { Input } from "../../shared/input";
import { Routes } from "../../framework/Router";
import Block from "../../framework/Block";
import "./styles.pcss";

export type TUserFormData = Record<string, string>;

export type TFormType = "profile" | "password";

type TEditFormProps = {
  formType: TFormType;
  avatarImageSrc?: string;
  avatarIconSrc: string;
  ProfileEditItems: {
    label: string;
    value?: string;
    fieldName: string;
    type: string;
    inputId: string;
  }[];
  SubmitButton: {
    label: string;
    onSubmit: (formType: TFormType, userData: TUserFormData) => Promise<number>
  }
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
        label: props.SubmitButton.label,
        className: "submit-button",
        onClick: async () => {
          let hasErrors = false;
          const userData: TUserFormData = {} as never;
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
            userData[field.fieldName as keyof TUserFormData] = fieldValue as string;
          });

          if (hasErrors) return;

          const result = await props.SubmitButton.onSubmit(props.formType, userData);
          
          if (result === 200) {
            this.RouterService.go(Routes.PROFILE);
          }
        },
      }),
      CancelButton: new Button({
        label: props.cancelButtonLabel,
        className: "cancel-button",
        onClick: () => this.RouterService.go(Routes.PROFILE),
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

