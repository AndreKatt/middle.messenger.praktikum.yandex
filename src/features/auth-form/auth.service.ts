import { Fetch } from "../../framework/Fetch";
import { authEndPoint, getEndPoint } from "../../utils/getEndPoint";

export type TUserFormData = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type TFormType = "signin" | "signup";

export class AuthService {
  protected readonly requestService = new Fetch();

  public async PostUser(
    formType: TFormType,
    formData: TUserFormData
  ) {
    const response = await this.requestService.post(
      getEndPoint(authEndPoint, formType),
      {
        data: JSON.stringify(formData),
        method: "POST",
        timeout: 0,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    if (response.status === 200) {
      const data = JSON.parse(response.response)?.data;
      if (data) {
        localStorage.setItem("id", data.id)
      } else {
        const result = await this.requestService.get(
          getEndPoint(authEndPoint, formType),
          {
            method: "GET",
            timeout: 0,
          }
        );

        if (result.status === 200) {
          const data = JSON.parse(result.response)?.data;
          if (data) {
            localStorage.setItem("id", data.id)
          }
        }
        return result;
      }
    }
    return response;
  }
};