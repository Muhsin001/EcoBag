import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryDate } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOptions, calculateDeliveryDate } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummery.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary () {

    let container = document.querySelector('.order-summary');

    let html = "";

    let dateString;


    function deliveryDate (deliveryOption){
            let today = dayjs();
            let deliveryDate = today.add(deliveryOption, "days");
            let dateString = deliveryDate.format('dddd, MMMM D');
            return dateString;
    }

        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
            
            const matchingProduct = getProduct(productId);

                let deliveryOptionId = cartItem.deliveryOptionId;

                let deliveryOption = getDeliveryOptions(deliveryOptionId);

                let dateString = calculateDeliveryDate(deliveryOption);


            html += `
            <div class="cart-item-container js-container-${matchingProduct.id}">
                    <div class="delivery-date js-delivery-date-${matchingProduct.id}">
                    Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary" data-product-id=${matchingProduct.id}>
                            Update
                        </span>
                        <input class='quantity-input js-quantity-input-${matchingProduct.id}'>
                        <span class="save-quantity-link link-primary" data-product-id=${matchingProduct.id}>
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
                            Delete
                        </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                        Choose a delivery option:
                        </div>
                        ${deliveryOptionHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
            `;
        });
    container.innerHTML = html;

    document.querySelectorAll('.delete-quantity-link').forEach((button, index) => {
        button.addEventListener('click', ()=> {
            let productId = button.dataset.productId;
            removeFromCart(productId);
            renderOrderSummary();
            renderPaymentSummary();
            renderCheckoutHeader();
        })
    });

    document.querySelectorAll('.update-quantity-link').forEach((button) => {
        button.addEventListener('click', () => {
            let {productId} = button.dataset;
            document.querySelector(`.js-container-${productId}`).classList.add('is-editing-quantity');
        })
    })

    document.querySelectorAll('.save-quantity-link').forEach((button) => {
        let {productId} = button.dataset;
        let input = document.querySelector(`.js-quantity-input-${productId}`);

        function saveQuantity (productId, input) {

            let inputValue = Number(input.value);

            document.querySelector(`.js-container-${productId}`).classList.remove('is-editing-quantity');

            if (inputValue < 0 || inputValue >= 1000) {
                alert("Quantity must be at least 1 and less than 1000 ")
                return;
            } else if (inputValue === 0) {
                return;
            }
            updateQuantity(productId, inputValue);
            document.querySelector(`.js-quantity-${productId}`).innerHTML = inputValue;
            
            renderCheckoutHeader();
            renderOrderSummary();
            renderPaymentSummary();
        }

        button.addEventListener('click', () => {
            saveQuantity(productId, input);
        })
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                saveQuantity(productId, input);
            }
        })
    })


    function deliveryOptionHTML (matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOptions) => {
            let dateString = calculateDeliveryDate(deliveryOptions)


            let priceString = deliveryOptions.deliveryPrice === 0 
                ? 'FREE' 
                : `$${formatCurrency(deliveryOptions.deliveryPrice)} -`;

            let isChecked = cartItem.deliveryOptionId == deliveryOptions.id;
            

            html += `
            <div class="delivery-option js-delivery-option"
                data-product-id='${matchingProduct.id}'
                data-delivery-option-id='${deliveryOptions.id}'>
                <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="${matchingProduct.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
            `;

            
            })
        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', ()=>{
            let {productId, deliveryOptionId} = element.dataset;
            console.log(deliveryDate(0));
            updateDeliveryDate(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        })
    });
}
// let today = dayjs();
// let isString = today.format('DD');
// console.log(isString);

// function isWeekend (date) {
//     let today = dayjs();
//     let isStringToday = today.format('D');
//     let difference;
//     let isDate

//     let isToday = Number(isStringToday);

//     if (isToday <= date) {
//         difference = date - isToday;
//         isDate = today.add(difference, 'days')
//     } else if (isToday > date) {
//         difference = date - isToday;
//         isDate = today.subtract(difference, 'days')
//     }

//     let isString = isDate.format('dddd')
    
//     return isString;
// }
// console.log(isWeekend(25))
renderOrderSummary();