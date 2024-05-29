import { IProductCardProps } from "../interface";

export const calcTotalPrice = (items: IProductCardProps[]) => {
    return items.reduce((sum, item) => {
        return (item.price * item.countProduct) + sum;
    }, 0)
}