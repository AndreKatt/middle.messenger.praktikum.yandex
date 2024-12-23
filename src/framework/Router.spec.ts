import { expect } from "chai";
import Router, { isEqual, Routes } from "./Router";
import sinon from 'sinon';
import Block from "./Block";

describe("String comparison", () => {
  it("should return true to equal strings", () => {
    return expect(isEqual("test!", "test!")).to.be.true;
  });
  it("should return false to unequal strings", () => {
    return expect(isEqual("test!", "test?")).to.be.false;
  });
});

describe("Custom router api testing", () => {
  const routePath = Routes.ERROR;
  const page = class Page extends Block {};

  it("should store component for each page", () => {

    return expect(Router.use(routePath, page)?.getRoute(routePath))
      .to.not.undefined;
  });

  beforeEach(() => Router.go(`${routePath}`));

  it("should use window history api", () => {
    return expect(window.location.pathname.includes(routePath)).to.be.true;
  });

  it("should navigate back by window history api", () => {
    Router.go(`${Routes.NOT_FOUND}`)
    const spiedGoBack = sinon.spy(window.history, "back");
    Router.back();

    return expect(spiedGoBack.calledOnce).to.be.true;
  });

  it("should navigate forward by window history api", () => {
    const spiedGo = sinon.spy(window.history, "go");
    Router.forward();

    return expect(spiedGo.calledWith(1)).to.be.true;
  });
})
