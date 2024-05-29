import { NewItems } from "../components/ newItems/NewItems";
import { CategoriesBlocks } from "../components/categoriesBlocks/CategoriesBlocks";
import { Slider } from "../components/slider/Slider";

export function Main() {

    return (
        <>
            <Slider />
            <CategoriesBlocks />
            <NewItems />
        </>
    )
}