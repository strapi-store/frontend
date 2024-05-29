import { Button } from "antd";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import BasketList from "../components/basket/BasketList";
import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

export function Basket() {
    const { totalPrice, items } = useAppSelector((state) => state.basket);


    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <Breadcrumbs />
                <h3 className="mb-6 font-semibold text-4xl">Корзина</h3>
                <div className="flex justify-between">
                    <div className="flex-col w-1/2 ">
                        {
                            items.map((item) => (
                                <BasketList key={item.id} price={item.price} title={item.title} imageUrl={item.imageUrl} id={item.id} countProduct={item.countProduct} />
                            ))
                        }
                    </div>
                    <div className="">
                        <p className="text-2xl font-semibold">Итого</p>
                        <p className="my-5">{totalPrice} ₽</p>
                        <Link to={'/order'}><Button>Перейти к оформлению</Button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}