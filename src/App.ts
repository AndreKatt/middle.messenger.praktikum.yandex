import Router, { Routes } from "./framework/Router";
import { 
  EditPasswordPage,
  EditProfilePage,
  HomePage,
  NotFoundPage, 
  ProfilePage, 
  ServerErrorPage, 
  SignInPage, 
  SignUpPage
} from "./pages";

export default class App {
  public readonly routerService = Router;

  public Render() {
    this.routerService
      .use(Routes.AUTH, SignInPage)
      ?.use(Routes.SIGN_UP, SignUpPage)
      ?.use(Routes.PROFILE, ProfilePage)
      ?.use(Routes.MESSENGER, HomePage)
      ?.use(Routes.SETTINGS, EditProfilePage)
      ?.use(Routes.PASSWORD_SETTINGS, EditPasswordPage)
      ?.use(Routes.NOT_FOUND, NotFoundPage)
      ?.use(Routes.ERROR, ServerErrorPage)
      ?.start();
  }
};
