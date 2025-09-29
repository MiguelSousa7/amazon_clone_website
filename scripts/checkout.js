import {
  cart,
  removeCartItem,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let CartItemsHTML = "";
updateOrderQuantity();

cart.forEach((cartItem, cartItemIndex) => {
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      CartItemsHTML += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date">Delivery date: Tuesday, June 21</div>

          <div class="cart-item-details-grid">
            <img
              class="product-image"
              src="${product.image}"
            />

            <div class="cart-item-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-price">$${formatCurrency(
                product.priceCents
              )}</div>
              <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-label-${
                  product.id
                }">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  product.id
                }">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${product.id}"/>
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                  product.id
                }">
                  Save
                </span> 
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  product.id
                }">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  checked
                  class="delivery-option-input"
                  name="delivery-option-${cartItemIndex}"
                />
                <div>
                  <div class="delivery-option-date">Tuesday, June 21</div>
                  <div class="delivery-option-price">FREE Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${cartItemIndex}"
                />
                <div>
                  <div class="delivery-option-date">Wednesday, June 15</div>
                  <div class="delivery-option-price">$4.99 - Shipping</div>
                </div>
              </div>
              <div class="delivery-option">
                <input
                  type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${cartItemIndex}"
                />
                <div>
                  <div class="delivery-option-date">Monday, June 13</div>
                  <div class="delivery-option-price">$9.99 - Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });
});

document.querySelector(".js-order-summary").innerHTML = CartItemsHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeCartItem(productId);
    updateOrderQuantity();

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.remove();
  });
});

function updateOrderQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-order-items-quantity"
  ).innerHTML = `${cartQuantity} items`;
}

document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    document
      .querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove("is-editing-quantity");

    const newQuantity = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );

    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      newQuantity;

    updateOrderQuantity();
  });
});
