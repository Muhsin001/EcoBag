import { cart, calculateCartQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../../utils/money.js";
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary () {
    let orderSummery = {
        items: 0,
        shippingPrice : 0
    };

    let html = '';

    cart.forEach((cartItem) => {
        let productId = cartItem.productId;
        let deliveryOptionId = cartItem.deliveryOptionId;

        let matchingProduct = getProduct(productId);
        let matchingPrice = getDeliveryOptions(deliveryOptionId);

        orderSummery.items += matchingProduct.priceCents * cartItem.quantity;
        orderSummery.shippingPrice += matchingPrice.deliveryPrice;
        

    })

        let totalBeforeTax = orderSummery.items + orderSummery.shippingPrice;
        let tax = totalBeforeTax / 10;
        let total = totalBeforeTax + tax;

    html = `
            <div class="payment-summary-title">
                Order Summary
            </div>

            <div class="payment-summary-row">
                <div>Items (${calculateCartQuantity()}):</div>
                <div class="payment-summary-money">${formatCurrency(orderSummery.items)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">${formatCurrency(orderSummery.shippingPrice)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">${formatCurrency(totalBeforeTax)}</div>
            </div>

            <div class="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div class="payment-summary-money">${formatCurrency(tax)}</div>
            </div>

            <div class="payment-summary-row total-row">
                <div>Order total:</div>
                <div class="payment-summary-money">${formatCurrency(total)}</div>
            </div>

            <button class="place-order-button button-primary">
                Place your order
            </button>
        `

        document.querySelector('.payment-summary').innerHTML = html;
}