import { EditForm } from "../../entities/edit-form";
import { editPassFields } from "../../assets";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";

export class EditPasswordPage extends Block {
  constructor() {
    super({
      EditForm: new EditForm({
        avatarIconSrc: PictureFillIcon,
        submitButtonLabel: "Сохранить",
        cancelButtonLabel: "Отмена",
        ProfileEditItems: editPassFields,
        formId: "formEditPassword",
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
