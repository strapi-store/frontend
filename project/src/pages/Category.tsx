import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ProductCard from "../components/productCard/ProductCard";
import { useEffect } from "react";
import { fetchCategories } from "../store/slices/categorySlice";


export function Category() {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])
    const categories = useAppSelector((state) => state.categories.categories);
    const category = categories.filter((item) => item.id === Number(id));
    const products = category[0].attributes.products.data;
    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <Breadcrumbs />
                <h3 className="mb-6 font-semibold text-4xl"></h3>
                <div className="grid grid-cols-5 gap-4">

                    {
                        products.map((item) => (
                            <ProductCard key={item.id} price={item.attributes.price} title={item.attributes.name} imageUrl={item.attributes.avatar.data.attributes.url} id={item.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}