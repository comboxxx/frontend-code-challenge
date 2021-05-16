import React, { Component } from "react";
// import { render, screen } from '@testing-library/react';
import App from "./App";
import { mount, shallow, ReactWrapper, ShallowWrapper } from "enzyme";

describe("App UI", () => {
  let component: ReactWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  // const setState = jest.fn();
  // const useStateSpy = jest.spyOn(React, "useState");
  // useStateSpy.mockImplementation((init: any) => [init, setState]);
  // let component: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  beforeEach(() => {
    // component = shallow(<App />);
    component = mount(<App />);
  });
  afterEach(() => {
    component.unmount();
  });

  //RENDERS ORDER BOOK
  it("should renders Order Book", () => {
    expect(component.find("#order_book")).toHaveLength(1);
  });

  it("should renders open_buy_order_modal_button AND open_sell_order_modal_button", () => {
    //OPEN BUY MODAL BUTTON
    expect(
      component.find(`#open_buy_order_modal_button`).hostNodes()
    ).toHaveLength(1);

    //OPEN SELL MODAL BUTTON
    expect(
      component.find(`#open_sell_order_modal_button`).hostNodes()
    ).toHaveLength(1);
  });

  it("should open BUY Order Modal then Cancel/Submit", () => {
    //SIMULATE CLICK OPEN BUY ORDER MODAL
    component
      .find("#open_buy_order_modal_button")
      .hostNodes()
      .simulate("click");

    //BUY ORDER MODAL APPEAR
    expect(component.find("#order_modal").hostNodes()).toHaveLength(1);

    //CANCEL ORDER/CLOSE BUY ORDER MODAL
    component.find("#close_order_modal_button").hostNodes().simulate("click");

    //ORDER MODAL DISAPPEAR
    expect(component.find("#order_modal").hostNodes()).toHaveLength(0);
  });

  it("should open SELL Order Modal then onChange localAmount then submit", () => {
    //SIMULATE CLICK SELL BUY ORDER MODAL
    component
      .find("#open_sell_order_modal_button")
      .hostNodes()
      .simulate("click");

    // DEFAULT PRICE INPUT VALUE
    let defaultPriceInputValue = component
      .find("#input_order_price")
      .hostNodes()
      .props().defaultValue;

    //EXPECT VALUE TO BE INITIALIZED
    expect(defaultPriceInputValue).not.toEqual("");

    //INPUT LOCAL PRICE
    const event = { target: { name: "localAmount", value: "1000.50" } };
    component
      .find("#input_order_localAmount")
      .hostNodes()
      .simulate("change", event);

    // CLICK ON PLACE ORDER BUTTON
    component.find("#place_order_button").hostNodes().simulate("submit");

    //SUBMIT SUCCESS: ORDER MODAL DISAPPEAR
    expect(component.find("#order_modal").hostNodes()).toHaveLength(0);
  });
});
