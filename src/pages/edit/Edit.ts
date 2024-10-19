import { editProfileFields } from "../../assets";
import { EditForm } from "../../entities/edit-form";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";

export class EditProfilePage extends Block {
  constructor() {
    super({
      EditForm: new EditForm({
        avatarIconSrc: PictureFillIcon,
        submitButtonLabel: "Сохранить",
        cancelButtonLabel: "Отмена",
        ProfileEditItems: editProfileFields,
        formId: "formEditProfile",
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
