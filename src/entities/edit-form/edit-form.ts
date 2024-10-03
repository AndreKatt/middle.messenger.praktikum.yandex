import { UserAvatar } from "../user-avatar";
import { Button } from "../../shared/button";
import Block from "../../framework/Block";
import "./styles.pcss";
import { ProfileEditItem } from "../../shared/profile-edit-item";

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
}

export class EditForm extends Block {
  constructor(props: TEditFormProps) {
    super({ 
      ...props,
      UserAvatar: new UserAvatar({
        className: "editProfileAvatarWrapper",
        iconSrc: props.avatarIconSrc,
        imageSrc: props.avatarImageSrc,
      }),
      ProfileEditItems: props.ProfileEditItems.map(field => 
        new ProfileEditItem({ ...field })
      ),
      SubmitButton: new Button({
        id: "btnToProfile",
        label: props.submitButtonLabel,
        className: "submitButton",
      }),
      CancelButton: new Button({
        id: "btnToProfile",
        label: props.cancelButtonLabel,
        className: "cancelButton",
      }),
    });
  }

  override render() {
    return `
      <div class="editFormContainer">
        {{{ UserAvatar }}}

        <form>
          {{{ ProfileEditItems }}}
        </form>
        
        {{{ SubmitButton }}}

        {{{ CancelButton }}}
      </div>
    `;
  }
};

