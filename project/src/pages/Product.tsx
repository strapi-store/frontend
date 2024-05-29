import { Button } from "antd";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Image } from 'antd';
import { addProduct } from "../store/slices/basketSlice";

export function Product() {

    const dispatch = useAppDispatch();
    const { id } = useParams();
    const products = useAppSelector((state) => state.products.products);
    const product = products.filter((item) => item.id === Number(id));
    const { name, price } = product[0].attributes;
    const gallery = product[0].attributes.gallery.data;
    const onClickAddProduct = () => {
        const item = {
            id,
            title: name,
            price,
        }
        dispatch(addProduct(item))
    }

    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <Breadcrumbs />
                <div className="flex justify-between">
                    <div className="max-w-2xl">
                        <p className="text-2xl font-semibold my-7">{product[0].attributes.name}</p>
                        <p className="my-7">{product[0].attributes.price} ₽</p>
                        <Image.PreviewGroup
                        >
                            {
                                gallery.map((item) =>
                                    <Image key={item.attributes.url} width={200} src={item.attributes.url} />
                                )
                            }
                        </Image.PreviewGroup>
                        <p className="text-2xl font-semibold my-7">Описание</p>
                        <p className="font-normal text-s text-text-gray my-7">{product[0].attributes.description}</p>
                    </div>
                    <div className="">
                        <div className="grid grid-cols-2 gap-2 m-10">
                            <Button onClick={onClickAddProduct}>В корзину</Button>
                            <Button>Быстрый заказ</Button>
                            <Button className="col-span-2">Забронировать в магазине</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}