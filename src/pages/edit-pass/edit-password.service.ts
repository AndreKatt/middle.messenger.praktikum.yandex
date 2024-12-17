import { TFormType, TUserFormData } from "../../features/edit-form/edit-form";
import { Fetch } from "../../framework/Fetch";
import { getEndPoint, userEndPoint } from "../../utils/getEndPoint";

export class EditPasswordService {
  protected readonly requestService = new Fetch();

  public async PutUser(
    formType: TFormType,
    formData: TUserFormData,
  ) {
    try {
      const { status } = await this.requestService.put(
        getEndPoint(userEndPoint, formType),
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
    } catch (e) {
      console.log(e);
    }
  }
};
