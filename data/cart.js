export const cart = [];

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
    cart.push({ productId: product_id, quantity: product_quantity });
  }
}
