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
  protected state: TState;
  protected appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: window.location.pathname as TState["currentPage"],
    };

    this.appElement = document.getElementById("app");
  }

  render() {
    if (this.state.currentPage === "/auth") {
      const page = new SignInPage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/signUp") {
      const page = new SignUpPage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/home") {
      const page = new HomePage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/profile") {
      const page = new ProfilePage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/edit") {
      const page = new EditProfilePage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/editPassword") {
      const page = new EditPasswordPage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/404") {
      const page = new NotFoundPage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
      }
    }

    if (this.state.currentPage === "/error") {
      const page = new ServerErrorPage();
      if (this.appElement) {
        this.appElement.replaceChildren(page.getContent());
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
        if (link.dataset.page) {
          this.changePage(link.dataset.page as TState["currentPage"]);
        }
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
