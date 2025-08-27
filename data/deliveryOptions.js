import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getDeliveryOptions (deliveryOptionId) {
    let deliveryOption;
      deliveryOptions.forEach((productsItem) => {
          if(deliveryOptionId == productsItem.id) {
              deliveryOption = productsItem;
          }
      })
      return deliveryOption || deliveryOptions[0];
}

function isWeekend (date) {
    let dayOfWeek = date.format('dddd');
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate (deliveryOption) {
    let deliveryDate = dayjs();
    let remainingDays = deliveryOption.deliveryTime;

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'days');
        if (!isWeekend(deliveryDate)) {
            remainingDays --;
        }
    }
   
    let dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}

export let deliveryOptions = [{
    id: 1,
    deliveryTime: 7,
    deliveryPrice: 0
},{
    id: 2,
    deliveryTime: 3,
    deliveryPrice: 499
},{
    id: 3,
    deliveryTime: 1,
    deliveryPrice: 999
}]