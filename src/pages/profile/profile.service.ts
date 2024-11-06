import { Fetch } from "../../framework/Fetch";
import { authEndPoint, getEndPoint } from "../../utils/getEndPoint";

export class ProfileService {
  protected readonly requestService = new Fetch();

  public async GetUser() {
    try {
      const data = await this.requestService.get(
        getEndPoint(authEndPoint, "user"),
        { method: "GET", timeout: 0 }
      );
  
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  public async LogOut() {
    try {
      const { status } = await this.requestService.post(
        getEndPoint(authEndPoint, "logout"),
        { method: "POST", timeout: 0 }
      );
  
      return status;
    } catch (e) {
      console.log(e);
    }
  }
};
