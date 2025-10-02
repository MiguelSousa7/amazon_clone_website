import {
  cart,
  removeCartItem,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  updateOrderQuantity();
  let CartItemsHTML = "";

  cart.forEach((cartItem) => {
    products.forEach((product) => {
      if (product.id === cartItem.productId) {
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
        const dateHTML = deliveryDate.format("dddd, MMMM D");

        CartItemsHTML += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
          <div class="delivery-date">Delivery date: ${dateHTML}</div>

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
              ${deliveryOptionsHTML(cartItem, product)}
            </div>
          </div>
        </div>
      `;
      }
    });
  });

  function deliveryOptionsHTML(cartItem, product) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "day");
      const dateHTML = deliveryDate.format("dddd, MMMM D");

      const priceHTML =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
    <div class="delivery-option js-delivery-option" data-product-id="${
      product.id
    }" data-delivery-option-id="${deliveryOption.id}">
      <input
      ${isChecked ? "checked" : ""} 
      type="radio"
          class="delivery-option-input"
          name="delivery-option-${product.id}"
        />
        <div>
          <div class="delivery-option-date">${dateHTML}</div>
          <div class="delivery-option-price">${priceHTML} Shipping</div>
        </div>
      </div>`;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = CartItemsHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeCartItem(productId);
      updateOrderQuantity();
      renderPaymentSummary();

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

  document.querySelectorAll(".js-delivery-option").forEach((optionElem) => {
    optionElem.addEventListener("click", () => {
      const { productId, deliveryOptionId } = optionElem.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
