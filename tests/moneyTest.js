import { formatCurrency } from "../scripts/utils/money.js";

console.log("---- test suite: formatCurrency ----");

// basic tests
console.log("Converts cents into dollars");
if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

// edge tests
console.log("Only converts to two decimals");
if (formatCurrency(0) === "0.000") {
  console.log("failed");
} else {
  console.log("passed");
}

console.log("Rounds up to the nearest cent");
if (formatCurrency(200.5) === "2.01") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("Rounds down to the nearest cent");
if (formatCurrency(200.3) === "2.00") {
  console.log("passed");
} else {
  console.log("failed");
}
