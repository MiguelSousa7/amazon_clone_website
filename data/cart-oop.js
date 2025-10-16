//funcao pra criar multiplos objetos
// quando se quer criar um novo carrinho, basta exec a funcao
function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: "1",
          },
          {
            productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            quantity: 1,
            deliveryOptionId: "2",
          },
        ];
      }
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(product_id, product_quantity) {
      let matchingProduct;

      //verifica se no carrinho ja existe um produto, caso exista, apenas aumenta a quantidade
      this.cartItems.forEach((cartItem) => {
        if (product_id === cartItem.productId) {
          matchingProduct = cartItem;
        }
      });
      if (matchingProduct) {
        matchingProduct.quantity += product_quantity;
      } else {
        this.cartItems.push({
          productId: product_id,
          quantity: product_quantity,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    },

    removeCartItem(product_id) {
      const newArray = [];

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== product_id) {
          newArray.push(cartItem);
        }
      });

      this.cartItems = newArray;
      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      return cartQuantity;
    },

    updateQuantity(productId, newQuantity) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;

      this.saveToStorage();
    },

    updateDeliveryOption(product_id, deliveryOption_id) {
      let matchingProduct;

      //verifica se no carrinho ja existe um produto, caso exista, apenas aumenta a quantidade
      this.cartItems.forEach((cartItem) => {
        if (product_id === cartItem.productId) {
          matchingProduct = cartItem;
        }
      });

      matchingProduct.deliveryOptionId = deliveryOption_id;

      this.saveToStorage();
    },
  };

  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("businessCart-oop");

cart.loadFromStorage();
businessCart.loadFromStorage();
