import { calcTotalPrice } from "./calcTotalPrice";

export function getBasketFromStorage() {
    const data = localStorage.getItem('basket');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items)

    return {
        items,
        totalPrice,
    }
}
