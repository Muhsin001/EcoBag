export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart (productId) {

        let quantity = document.querySelector(`.js-quantity-selector-${productId}`);
          quantity = Number(quantity.value);
          console.log(quantity)
            let matchingItem;
          cart.forEach((item) => {
              if (productId === item.productId){
                  matchingItem = item;
              }
          });

          if (matchingItem) {
              matchingItem.quantity += quantity;
          } else {
              cart.push({
                  productId,
                  quantity,
                  deliveryOptionId: '1'
              });
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        }
        
export function removeFromCart (productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId != productId) {
            newCart.push(cartItem);
        }
    })

    cart = newCart;
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((value) => {
        cartQuantity += value.quantity;
    })
    return cartQuantity;
}

export function updateQuantity (productId, newQuantity) {
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            cartItem.quantity = newQuantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    })
}


export function updateDeliveryDate (productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;
    console.log(matchingItem.deliveryOptionId);

    localStorage.setItem('cart', JSON.stringify(cart));
}
