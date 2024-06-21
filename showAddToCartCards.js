import products from "./api/products.json";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { getCartProductFromLS } from "./getCartProducts.js";
import { incrementDecrement } from "./incrementDecrement.js";
import { removeProdFromCart } from "./removeProdFromCart.js";
import { updateCartProductTotal } from "./updateCartProductTotal.js";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((curProd) => {
  return cartProducts.some((curElem) => curElem.id === curProd.id);
});

console.log(filterProducts);

// -----------------------------------------------------
// to update the addToCart page
// --------------------------------------------------------
const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

const showCartProduct = () => {
  if (!cartElement || !templateContainer) {
    console.error("Cart element or template container not found");
    return;
  }

  filterProducts.forEach((curProd) => {
    const { category, id, image, name, stock, price } = curProd;

    let productClone = document.importNode(templateContainer.content, true);

    if (!productClone) {
      console.error("Failed to clone template content");
      return;
    }

    const lSActualData = fetchQuantityFromCartLS(id, price);

    const cardValueElement = productClone.querySelector("#cardValue");
    if (cardValueElement) {
      cardValueElement.setAttribute("id", `card${id}`);
    } else {
      console.error("Card value element not found in template");
    }

    const categoryElement = productClone.querySelector(".category");
    if (categoryElement) {
      categoryElement.textContent = category;
    } else {
      console.error("Category element not found in template");
    }

    const productNameElement = productClone.querySelector(".productName");
    if (productNameElement) {
      productNameElement.textContent = name;
    } else {
      console.error("Product name element not found in template");
    }

    const productImageElement = productClone.querySelector(".productImage");
    if (productImageElement) {
      productImageElement.src = image;
    } else {
      console.error("Product image element not found in template");
    }

    const productQuantityElement = productClone.querySelector(".productQuantity");
    if (productQuantityElement) {
      productQuantityElement.textContent = lSActualData.quantity;
    } else {
      console.error("Product quantity element not found in template");
    }

    const productPriceElement = productClone.querySelector(".productPrice");
    if (productPriceElement) {
      productPriceElement.textContent = lSActualData.price;
    } else {
      console.error("Product price element not found in template");
    }

    // handle increment and decrement button
    const stockElement = productClone.querySelector(".stockElement");
    if (stockElement) {
      stockElement.addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });
    } else {
      console.error("Stock element not found in template");
    }

    const removeButton = productClone.querySelector(".remove-to-cart-button");
    if (removeButton) {
      removeButton.addEventListener("click", () => removeProdFromCart(id));
    } else {
      console.error("Remove button not found in template");
    }

    cartElement.appendChild(productClone);
  });
};

// -----------------------------------------------------
// Showing the cartProducts
// --------------------------------------------------------
showCartProduct();

// -----------------------------------------------------
// calculating the card total in our cartProducts page
// --------------------------------------------------------
updateCartProductTotal();
