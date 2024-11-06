import { EditForm } from "../../features/edit-form";
import { EditProfileService } from "./edit-profile.service";
import { Routes } from "../../framework/Router";
import Block from "../../framework/Block";
import PictureFillIcon from "../../assets/PictureFill.svg";
import { TFormType, TUserFormData } from "../../features/edit-form/edit-form";
import "./styles.pcss";

export class EditProfilePage extends Block {
  protected readonly editFormService = new EditProfileService();

  constructor() {
    super();

    setTimeout(async () => {
      const result = await this.editFormService.GetUser();
      
      if (!result) {
        return;
      }
      
      if (result.status === 200) {
        const data = JSON.parse(result.response);
        const profileEditItems = [
          {
            label: "Имя",
            fieldName: "first_name",
            value: data.first_name,
            type: "text",
            inputId: "first_name",
          },
          {
            label: "Фамилия",
            fieldName: "second_name",
            value: data.second_name,
            type: "text",
            inputId: "second_name",
          },
          {
            label: "Имя в чате",
            fieldName: "display_name",
            value: data.display_name,
            type: "text",
            inputId: "display_name",
          },
          {
            label: "Логин",
            fieldName: "login",
            value: data.login,
            type: "text",
            inputId: "login",
          },
          {
            label: "Почта",
            fieldName: "email",
            value: data.email,
            type: "email",
            inputId: "email",
          },
          {
            label: "Телефон",
            fieldName: "phone",
            value: data.phone,
            type: "text",
            inputId: "phone",
          }
        ];

        this.setProps({
          EditForm: new EditForm({
            formType: "profile",
            avatarIconSrc: PictureFillIcon,
            cancelButtonLabel: "Отмена",
            formId: "formEditProfile",
            ProfileEditItems: profileEditItems,
            SubmitButton: {
              label: "Сохранить",
              onSubmit: async (formType: TFormType, userData: TUserFormData) => {
                const result = await this.editFormService.PutUser(formType, userData);

                return result;
              },
            }
          }),
        });
      } else if (result.status === 401) {
        this.RouterService.go(Routes.AUTH);
      }
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
