
interface ItemOrder {
    name: string,
    price: number,
    amount: number
}


interface Coupon {
    code: string,
    minTotal: number,
    discountPercent: number, 
}   

const COUPONS: Coupon[] = [
    {
        code: 'SAVE10', minTotal: 100, discountPercent: 10
    },
    {
        code: 'HALF', minTotal: 500, discountPercent: 50
    }
]


/**
 * Calculates the order total price
 * @param { ItemOrder } items - Order's items which price will be calculated 
 * @returns { number } Sum of the items' prices
 */
function calculateOrderPrice(items: ItemOrder[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.amount), 0)
}

/**
 * Searches for a coupon info by coupon code
 * @param { string } code - Coupon's code 
 * @returns { Coupon | undefined } Detailed coupon information 
 */
function findCoupon(code: string): Coupon | undefined {
    return COUPONS.find(coupon => coupon.code === code)
}

/**
 * Calculates the discount, if the order price meets the minimum price for this discount
 * @param { number } total - Initial order price 
 * @param { Coupon } coupon - Detailed coupon information 
 * @returns { Coupon } Calculated discount 
 */
function applyDiscount(total: number, coupon: Coupon): number {
    if (total >= coupon.minTotal) {
        return total * (coupon.discountPercent / 100);
    }
    return 0;
}

/**
 * Processes the order by applying discounts and recalculating the price, if applicable
 * @param { ItemOrder[] } items - Order's items 
 * @param { string | undefined } couponCode - Coupon code 
 */
export function processOrder(items: ItemOrder[], couponCode?: string) {
    const orderPrice = calculateOrderPrice(items);

    let discount = 0
    let appliedCoupon: string | null = null


    if (couponCode) {
        const coupon = findCoupon(couponCode);

        if(coupon) {
            discount = applyDiscount(orderPrice, coupon)

            if(discount > 0) {
                appliedCoupon = coupon.code
            }
        }
    
    }

    return {
        orderPrice, 
        discount, 
        totalPrice: orderPrice - discount,
        appliedCoupon
    }
}