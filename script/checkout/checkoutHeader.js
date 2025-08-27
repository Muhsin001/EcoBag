import { calculateCartQuantity } from "../../data/cart.js"

export function renderCheckoutHeader () {

    let html = `
        <div class="header-content">
            <div class="checkout-header-left-section">
            <a href="amazon.html">
                <img class="amazon-logo" src="images/EcoBags_black.png">
                <img class="amazon-mobile-logo" src="images/black.png">
            </a>
            </div>

            <div class="checkout-header-middle-section">
            Checkout (<a class="return-to-home-link"
                href="amazon.html">${calculateCartQuantity()} items</a>)
            </div>

            <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    `
    document.querySelector('.checkout-header').innerHTML = html;
}