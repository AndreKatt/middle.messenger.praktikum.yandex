import { TFormType, TUserFormData } from "../../features/edit-form/edit-form";
import { Fetch } from "../../framework/Fetch";
import { API_URL, authEndPoint, getEndPoint } from "../../utils/getEndPoint";

export class EditProfileService {
  protected readonly requestService = new Fetch();

  public async GetUser() {
    const data = await this.requestService.get(
      getEndPoint(authEndPoint, "user"),
      { method: "GET", timeout: 0 }
    );

    return data;
  }

  public async PutUser(
    formType: TFormType,
    formData: TUserFormData,
  ) {
    const { status } = await this.requestService.put(
      getEndPoint(API_URL, "user", formType),
      {
        data: JSON.stringify(formData),
        method: "PUT",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return status;
  }
};
