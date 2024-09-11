import Handlebars from "handlebars";

import { 
  homeTemplateProps, 
  profileTemplateProps, 
  signInTemplateProps, 
  signUpTemplateProps 
} from "./assets";
import { Input } from './shared/input';
import { Button } from './shared/button';
import { ProfileInfoItem } from './shared/profile-info-item';
import { Error } from './entities/error';
import { MessagePreview } from './entities/message-preview';
import * as Pages from './pages';

// потом используются на страничках через {{> Field id='' ...props}}
// экспорт строкой типа:
// *.js export default `<input id="{{id}}" />` или *.hbs?raw
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('ProfileInfoItem', ProfileInfoItem);
Handlebars.registerPartial('Error', Error);
Handlebars.registerPartial('MessagePreview', MessagePreview);

export default class App {
  protected state: TState;
  protected appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: window.location.pathname as TState['currentPage'],
    };

    this.appElement = document.getElementById('app');
  }

  render() {
    let template: any;

    if (this.state.currentPage === '/auth') {
      template = Handlebars.compile(Pages.SignInPage);
      if (this.appElement) {
        this.appElement.innerHTML = template(signInTemplateProps);
      }
    }

    if (this.state.currentPage === '/signUp') {
      template = Handlebars.compile(Pages.SignUpPage);
      if (this.appElement) {
        this.appElement.innerHTML = template(signUpTemplateProps);
      }
    }

    if (this.state.currentPage === '/home') {
      template = Handlebars.compile(Pages.HomePage);
      if (this.appElement) {
        this.appElement.innerHTML = template(homeTemplateProps);
      }
    }

    if (this.state.currentPage === '/profile') {
      template = Handlebars.compile(Pages.ProfilePage);
      if (this.appElement) {
        this.appElement.innerHTML = template(profileTemplateProps);
      }
    }

    if (this.state.currentPage === '/404') {
      template = Handlebars.compile(Pages.NotFoundPage);
      if (this.appElement) this.appElement.innerHTML = template({});
    }

    if (this.state.currentPage === '/error') {
      template = Handlebars.compile(Pages.ServerErrorPage);
      if (this.appElement) this.appElement.innerHTML = template({});
    }
    this.attachEventListeners();
  }

  attachEventListeners() {
    const links = document.querySelectorAll('.link');

    links.forEach(el => {
      el.addEventListener('click', (e) => {
        const link = e.target as HTMLLinkElement;

        e.preventDefault();
        link.dataset.page && this.changePage(link.dataset.page as TState['currentPage']);
      })
    })
  }

  changePage(page: TState['currentPage']) {
    this.state.currentPage = page;
    this.render();
  }
};

type TState = {
  currentPage: '/auth' 
    | '/signUp' 
    | '/profile' 
    | '/404' 
    | '/error'
    | '/home';
};
