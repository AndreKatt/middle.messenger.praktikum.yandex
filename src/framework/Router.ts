import Block from "./Block";

export enum Routes {
  AUTH = "/",
  SIGN_UP = "/sign-up",
  PROFILE = "/profile",
  NOT_FOUND = "/404",
  ERROR = "/error",
  MESSENGER = "/messenger",
  SETTINGS = "/settings",
  PASSWORD_SETTINGS = "/settings-password",
}

type TRouteProps = {
  rootQuery: string;
}

const isEqual = (lhs: string, rhs: string) => {
  return lhs === rhs;
}

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  
  if (root) {
    root.replaceChildren(block.getContent());

    return root;
  }
}

class Route<BlockClass extends typeof Block> {
  protected _pathname: `${Routes}`;
  protected _block: Block | null = null;
  protected _blockClass: BlockClass;
  protected _props: TRouteProps;

  constructor(
    pathname: `${Routes}`,
    view: BlockClass,
    props: TRouteProps,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: `${Routes}`) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: `${Routes}`) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
    }
    
    render(this._props.rootQuery, this._block);
  }
}

class Router {
  protected __instance: this | null = null;
  protected _currentRoute: Route<typeof Block> | null = null;
  protected _rootQuery: string | null = null;
  protected routes: Route<typeof Block>[] = [];
  
  protected readonly history = window.history;

  constructor(rootQuery: string) {
    if (this.__instance) {
      return this.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    this.__instance = this;
  }

  use(pathname: `${Routes}`, block: typeof Block) {
    if (this._rootQuery) {
      const route = new Route(pathname, block, {rootQuery: this._rootQuery});
      this.routes.push(route);

      return this;
    }
  }

  start() {
    window.onpopstate = e => {
      const browser = e.currentTarget as Window;
      if (browser) {
        this._onRoute(browser.location.pathname as `${Routes}`)
      }
    };

    this._onRoute(window.location.pathname as `${Routes}`)
  }

  _onRoute(pathname: `${Routes}`) {
    const route = this.getRoute(pathname);

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: `${Routes}`) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.go(1)
  }

  getRoute(pathname: `${Routes}`) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router("#app");
