import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    spyOn(localStorage, "setItem").and.callFake(() => {});

    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  });

  it("adds a new product to the cart", () => {
    // mock, copia e manipula (com duracao de 1 teste) o metodo getItem do localStorage para o obrigar a comecar vazio,
    // assim o teste passa sempre, independentemente do valor real de items armazenados no carrinho
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    spyOn(localStorage, "setItem").and.callFake(() => {});

    // da reload ao cart, assim fica vazio por causa do mock
    loadFromStorage();

    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });
});
