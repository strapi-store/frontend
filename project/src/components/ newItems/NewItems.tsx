import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ProductCard from "../productCard/ProductCard";
import { fetchProducts } from "../../store/slices/productSlice";

export function NewItems() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])
    const product = useAppSelector((state) => state.products.products);
    const newProduct = product.filter((item) => item.attributes.newProduct);
    return (
        <section className="new-items">
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <h3 className="mb-6 font-semibold text-4xl">Новинки</h3>
                <div className="grid grid-cols-5 gap-4">
                    {
                        newProduct.map((item) => (
                            <ProductCard key={item.id} price={item.attributes.price} title={item.attributes.name} imageUrl={item.attributes.avatar.data.attributes.url} id={item.id} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}