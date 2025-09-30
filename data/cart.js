export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
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

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product_id, product_quantity) {
  let matchingProduct;

  //verifica se no carrinho ja existe um produto, caso exista, apenas aumenta a quantidade
  cart.forEach((cartItem) => {
    if (product_id === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct) {
    matchingProduct.quantity += product_quantity;
  } else {
    cart.push({
      productId: product_id,
      quantity: product_quantity,
      deliveryOptionId: "1",
    });
  }

  saveToStorage();
}

export function removeCartItem(product_id) {
  const newArray = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== product_id) {
      newArray.push(cartItem);
    }
  });

  cart = newArray;
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(product_id, deliveryOption_id) {
  let matchingProduct;

  //verifica se no carrinho ja existe um produto, caso exista, apenas aumenta a quantidade
  cart.forEach((cartItem) => {
    if (product_id === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });

  matchingProduct.deliveryOptionId = deliveryOption_id;

  saveToStorage();
}
