import { useEffect } from "react";
import { ICategory } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Block from "./Block";
import { fetchCategories } from "../../store/slices/categorySlice";

export function CategoriesBlocks() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch])
    const categories = useAppSelector((state) => state.categories.categories);
    const populationCategories = categories.filter((item) => item.attributes.population);
    return (
        <section className="category">
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <h3 className="mb-6 font-semibold text-4xl">Популярные категории</h3>
                <div className="grid grid-cols-3 gap-4">
                    {
                        populationCategories.map((category: ICategory) =>
                            <Block key={category.attributes.title} title={category.attributes.title} categoryImage={category.attributes.categoryImage.data.attributes.formats.small.url} />
                        )
                    }
                </div>
            </div>
        </section>
    )
}