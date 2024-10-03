import { EditForm } from "../../entities/edit-form";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import "./styles.pcss";
import { editProfileFields } from "../../assets";

export class EditProfilePage extends Block {
  constructor() {
    super({
      EditForm: new EditForm({
        avatarIconSrc: PictureFillIcon,
        submitButtonLabel: "Сохранить",
        cancelButtonLabel: "Отмена",
        ProfileEditItems: editProfileFields,
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
