import { validate } from "../../utils/validate";
import { UserAvatar } from "../../entities/user-avatar";
import { Button } from "../../shared/button";
import { ProfileEditItem } from "../../shared/profile-edit-item";
import { Input } from "../../shared/input";
import { Routes } from "../../framework/Router";
import { ProfilePage } from "../../pages";
import Block from "../../framework/Block";
import "./styles.pcss";

export type TUserFormData = Record<string, string>;

export type TFormType = "profile" | "password";

type TEditFormProps = {
  formType: TFormType;
  avatarImageSrc?: string;
  avatarIconSrc: string;
  onUploadAvatar?: (file: File) => void;
  ProfileEditItems: {
    label: string;
    value?: string;
    fieldName: string;
    type: string;
    inputId: string;
  }[];
  SubmitButton: {
    label: string;
    onSubmit: (
      formType: TFormType,
      userData: TUserFormData
    ) => Promise<number | undefined>
  }
  cancelButtonLabel: string;
  formId: string;
}

export class EditForm extends Block {
  constructor(props: TEditFormProps) {
    let className: string;
    const hasImage = !!props.avatarImageSrc;
    const isProfile = props.formType === "profile";

    if (isProfile) {
      className = hasImage 
        ? "edit-profile-change-avatar-wrapper"
        : "edit-profile-change-avatar-placeholder-wrapper"
    } else {
      className = hasImage 
        ? "edit-profile-avatar-wrapper"
        : "edit-profile-avatar-placeholder-wrapper"
    }

    super({ 
      ...props,
      isProfile: isProfile,
      UserAvatar: new UserAvatar({
        className: className,
        iconSrc: props.avatarIconSrc,
        imageSrc: hasImage ? props.avatarImageSrc : undefined,
        onClick: () => {
          if (isProfile) {
            const fileInput = document.getElementById("avatar") as HTMLInputElement;
            fileInput?.click();
            fileInput.onchange = (e) => {
              if (!props.onUploadAvatar) {
                return;
              }
              const input = e.target as HTMLInputElement;
              const file = input.files?.[0];

              if (file) {
                props.onUploadAvatar(file);
              }
            }
          }
        }
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
          const userData = {} as TUserFormData;
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

          const status = await props.SubmitButton.onSubmit(props.formType, userData);
          
          if (status === 200) {
            this.RouterService.reassign(Routes.PROFILE, ProfilePage);
            this.RouterService.go(Routes.PROFILE);
          } else if (status === 401) {
            this.RouterService.go(Routes.AUTH);
          }
        },
      }),
      CancelButton: new Button({
        label: props.cancelButtonLabel,
        className: "cancel-button",
        onClick: () => {
          this.RouterService.go(Routes.PROFILE);
          this.RouterService.reassign(Routes.PROFILE, ProfilePage);
        },
      }),
    });
  }

  override render() {
    return `
      <div class="edit-form-container">
        {{#if isProfile}}
        <input 
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          class="hidden-input"
        />
        {{/if}}
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

