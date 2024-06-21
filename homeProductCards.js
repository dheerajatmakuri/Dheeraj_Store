import { addToCart } from "/addToCart.js";
import { homeQuantityToggle } from "/homeQuantityToggle.js";

const showProductContainer = (products) => {
  const productContainer = document.querySelector("#productContainer");
  const productTemplate = document.querySelector("#productTemplate");

  if (!productTemplate) {
    console.error('productTemplate is null');
    return;
  }

  if (!products) {
    return false;
  }

  products.forEach((curProd) => {
    const { brand, category, description, id, image, name, price, stock } = curProd;

    const productClone = document.importNode(productTemplate.content, true);

    if (!productClone) {
      console.error("Failed to clone template content");
      return;
    }

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
      productImageElement.alt = name;
    } else {
      console.error("Product image element not found in template");
    }

    const productBrandElement = productClone.querySelector(".productBrand");
    if (productBrandElement) {
      productBrandElement.textContent = brand;
    } else {
      console.error("Product brand element not found in template");
    }

    const productStockElement = productClone.querySelector(".productStock");
    if (productStockElement) {
      productStockElement.textContent = stock;
    } else {
      console.error("Product stock element not found in template");
    }

    const productDescriptionElement = productClone.querySelector(".productDescription");
    if (productDescriptionElement) {
      productDescriptionElement.textContent = description;
    } else {
      console.error("Product description element not found in template");
    }

    const productPriceElement = productClone.querySelector(".productPrice");
    if (productPriceElement) {
      productPriceElement.textContent = `₹${price}`;
    } else {
      console.error("Product price element not found in template");
    }

    const productActualPriceElement = productClone.querySelector(".productActualPrice");
    if (productActualPriceElement) {
      productActualPriceElement.textContent = `₹${price * 1.5}`;
    } else {
      console.error("Product actual price element not found in template");
    }

    const stockElement = productClone.querySelector(".stockElement");
    if (stockElement) {
      stockElement.addEventListener("click", (event) => {
        homeQuantityToggle(event, id, stock);
      });
    } else {
      console.error("Stock element not found in template");
    }

    const addToCartButton = productClone.querySelector(".add-cart-button");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", (event) => {
        addToCart(event, id, stock);
      });
    } else {
      console.error("Add to cart button not found in template");
    }

    productContainer.append(productClone);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // You can now call showProductContainer with your product data here
});

export { showProductContainer };
