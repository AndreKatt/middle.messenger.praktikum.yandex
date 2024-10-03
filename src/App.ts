import Handlebars from "handlebars";

import { 
  editPassTemplateProps,
  editProfileTemplateProps,
  homeTemplateProps, 
  profileTemplateProps, 
  signInTemplateProps, 
  signUpTemplateProps 
} from "./assets";
import { Input } from "./shared/input";
import { Button } from "./shared/button";
import { ProfileInfoItem } from "./shared/profile-info-item";
import { ProfileEditItem } from "./shared/profile-edit-item";
import { Error } from "./entities/error";
import { MessagePreview } from "./entities/message-preview";
import { EditForm } from "./entities/edit-form";
import { AuthForm } from "./entities/auth-form";
import { Avatar } from "./shared/avatar";
import { UserAvatar } from "./entities/user-avatar";
import * as Pages from "./pages";

Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("ProfileInfoItem", ProfileInfoItem);
Handlebars.registerPartial("ProfileEditItem", ProfileEditItem);
Handlebars.registerPartial("Error", Error);
Handlebars.registerPartial("MessagePreview", MessagePreview);
Handlebars.registerPartial("EditForm", EditForm);
Handlebars.registerPartial("AuthForm", AuthForm);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("UserAvatar", UserAvatar);

export default class App {
  protected state: TState;
  protected appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: window.location.pathname as TState["currentPage"],
    };

    this.appElement = document.getElementById("app");
  }

  render() {
    let template: any;

    if (this.state.currentPage === "/auth") {
      template = Handlebars.compile(Pages.SignInPage);
      if (this.appElement) {
        this.appElement.innerHTML = template(signInTemplateProps);
      }
    }

    if (this.state.currentPage === "/signUp") {
      template = Handlebars.compile(Pages.SignUpPage);
      if (this.appElement) {
        this.appElement.innerHTML = template(signUpTemplateProps);
      }
    }

    if (this.state.currentPage === "/home") {
      template = Handlebars.compile(Pages.HomePage);
      if (this.appElement) {
        this.appElement.innerHTML = template(homeTemplateProps);
      }
    }

    if (this.state.currentPage === "/profile") {
      template = Handlebars.compile(Pages.ProfilePage);
      if (this.appElement) {
        this.appElement.innerHTML = template(profileTemplateProps);
      }
    }

    if (this.state.currentPage === "/edit") {
      template = Handlebars.compile(Pages.EditProfilePage);
      if (this.appElement) {
        this.appElement.innerHTML = template(editProfileTemplateProps);
      }
    }

    if (this.state.currentPage === "/editPassword") {
      template = Handlebars.compile(Pages.EditPasswordPage);
      if (this.appElement) {
        this.appElement.innerHTML = template(editPassTemplateProps);
      }
    }

    if (this.state.currentPage === "/404") {
      template = Handlebars.compile(Pages.NotFoundPage);
      if (this.appElement) {
        this.appElement.innerHTML = template({})
      }
    }

    if (this.state.currentPage === "/error") {
      template = Handlebars.compile(Pages.ServerErrorPage);
      if (this.appElement) {
        this.appElement.innerHTML = template({})
      }
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const links = document.querySelectorAll(".link");
    links.forEach(el => {
      el.addEventListener("click", (e) => {
        const link = e.target as HTMLLinkElement;
        e.preventDefault();
        link.dataset.page && this.changePage(link.dataset.page as TState["currentPage"]);
      })
    })

    const btnsToProfile = document.querySelectorAll("#btnToProfile");
    btnsToProfile.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage("/profile");
      })
    })

    const btnsToEdit = document.querySelectorAll("#btnToEdit");
    btnsToEdit.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage("/edit");
      })
    })

    const btnsToEditPass = document.querySelectorAll("#btnToEditPass");
    btnsToEditPass.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage("/editPassword");
      })
    })

    const btnsToAuth = document.querySelectorAll("#btnToAuth");
    btnsToAuth.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage("/auth");
      })
    })

    const btnsToSignUp = document.querySelectorAll("#btnToSignUp");
    btnsToSignUp.forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.changePage("/signUp");
      })
    })
  }

  changePage(page: TState["currentPage"]) {
    this.state.currentPage = page;
    this.render();
  }
};

type TState = {
  currentPage: "/auth" 
    | "/signUp" 
    | "/profile" 
    | "/404" 
    | "/error"
    | "/home"
    | "/edit"
    | "/editPassword";
};
