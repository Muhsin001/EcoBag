import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js'
import { formatCurrency } from '../utils/money.js';

let productHTML = '';
let container = document.querySelector('.products-grid');

console.log(products[0].rating.stars * 10);

products.forEach((value, index) => {
  productHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${value.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${value.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${value.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${value.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(value.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${value.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-cart-${value.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id='${value.id}'>
            Add to Cart
          </button>
        </div>
  `;
})

  container.innerHTML = productHTML;

   
        let timeoutId;

        function updateCartQuantity () {
          let quantity = calculateCartQuantity();

          if (quantity === 0) {
            document.querySelector('.cart-quantity').innerHTML = '';
          }else {
            document.querySelector('.cart-quantity').innerHTML = quantity;
          }
          
          }

          

        function timeout (productId) {

        let cartAdded = document.querySelector(`.js-added-cart-${productId}`);
          cartAdded.classList.add('js-added-to-cart-visible');

          clearTimeout(timeoutId);

          timeoutId = setTimeout(() => {
            cartAdded.classList.remove('js-added-to-cart-visible')
          }, 2000);
        }


  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        let { productId } = button.dataset;
        addToCart(productId);
        updateCartQuantity();
        timeout(productId);
    });
  });

  updateCartQuantity();

  
  
