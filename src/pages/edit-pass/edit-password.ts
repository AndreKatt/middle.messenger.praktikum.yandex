import { EditForm } from "../../features/edit-form";
import { editPassFields } from "../../assets";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import { EditPasswordService } from "./edit-password.service";
import { TFormType, TUserFormData } from "../../features/edit-form/edit-form";

export class EditPasswordPage extends Block {
  protected readonly editFormService = new EditPasswordService();
  constructor() {
    super({
      EditForm: new EditForm({
        formType: "password",
        avatarIconSrc: PictureFillIcon,
        cancelButtonLabel: "Отмена",
        ProfileEditItems: editPassFields,
        formId: "formEditPassword",
        SubmitButton: {
          label: "Сохранить",
          onSubmit: async (formType: TFormType, userData: TUserFormData) => {
            const result = await this.editFormService.PutUser(formType, userData);

            return result;
          },
        }
      }),
    });
  }

  override render() {
    return `
      <main>
        <div class="profile-page-wrapper">
          {{{ EditForm  }}}
        </div>
      </main>
    `;
  }
};
