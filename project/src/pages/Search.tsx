import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import ProductCard from "../components/productCard/ProductCard";
import { useAppSelector } from "../store/hooks";


export function Search() {
    const searchProducts = useAppSelector((state) => state.products.searchProducts);
    console.log(searchProducts)
    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <Breadcrumbs />
                <h3 className="mb-6 font-semibold text-4xl"></h3>
                <div className="grid grid-cols-5 gap-4">
                    {
                        searchProducts.map((item) => (
                            <ProductCard key={item.id} price={Number(item.attributes.price)} title={item.attributes.name} imageUrl={item.attributes.avatar.data.attributes.url} id={item.id} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}


