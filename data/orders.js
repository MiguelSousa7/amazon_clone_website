export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unShift(order);
  safeToStorage;
}

function safeToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
