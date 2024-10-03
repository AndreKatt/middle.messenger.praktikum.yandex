import { EditForm } from "../../entities/edit-form";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import { editPassFields } from "../../assets";

export class EditPasswordPage extends Block {
  constructor() {
    super({
      EditForm: new EditForm({
        avatarIconSrc: PictureFillIcon,
        submitButtonLabel: "Сохранить",
        cancelButtonLabel: "Отмена",
        ProfileEditItems: editPassFields,
      }),
    });
  }

  override render() {
    return `
      <main>
        <div class="profilePageWrapper">
          {{{ EditForm  }}}
        </div>
      </main>
    `;
  }
};
