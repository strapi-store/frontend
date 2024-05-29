import { Link, useNavigate } from "react-router-dom";
import { Input } from 'antd';
import { SearchProps } from "antd/es/input";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICategory } from "../../interface";
import { useEffect, useRef } from "react";
import { fetchCategories } from "../../store/slices/categorySlice";
import { fetchProducts, searchProducts } from "../../store/slices/productSlice";
import { removeUser } from "../../store/slices/userSlice";


const { Search } = Input;




export function Header() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuth = Boolean(user.token);

    const { items } = useAppSelector((state) => state.basket)
    const basketCount = items.reduce((sum, item) =>
        sum + item.countProduct, 0);

    const products = useAppSelector((state) => state.products.products);
    const categories = useAppSelector((state) => state.categories.categories);


    const onSearch: SearchProps['onSearch'] = (value) => {
        const filtredProducts = products.filter((product) => {
            return product.attributes.name.toLowerCase().includes(value.toLowerCase())
        });
        dispatch(searchProducts(filtredProducts));
        navigate(`/search?=${value}`)
    }

    const logout = () => {
        if (isAuth) {
            dispatch(removeUser())
        }
    }

    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) {
            const products = JSON.stringify(items);
            localStorage.setItem('basket', products);
        }
        isMounted.current = true;
    }, [items]);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, [dispatch])

    return (
        <header className="bg-blue" >
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <div className="flex justify-between items-center">
                    <Link className="logo" to={"/"}>
                        <img className="max-w-14" src="/src/assets/logo.svg" alt="" />
                    </Link>
                    <Search placeholder="Поиск по товарам" onSearch={onSearch} size="large" className="max-w-lg" />
                    <div className="flex">
                        <div className="flex flex-col font-semibold mr-2.5">
                            <Link className="title text-sm text-white" to={isAuth ? "/lk" : "/auth"}>Личный кабинет</Link>
                            <Link className="info text-xs text-text-gray" to={isAuth ? "/" : "/auth"} onClick={logout}>{isAuth ? "Выйти" : "Авторизуйтесь"}</Link>
                        </div>
                        <img src="/src/assets/lk-icon-button.svg" alt="" className="" />
                    </div >
                    <Link to="/basket" className="flex">
                        <div className="font-semibold mr-2.5">
                            <p className="title text-sm text-white">Корзина</p>
                            <p className="info text-xs text-text-gray">{`${basketCount} товар`}</p>
                        </div>
                        <img src="/src/assets/basket-icon.svg" alt="" className="" />
                    </Link >
                </div>
            </div >
            <div className="bg-blue-dark">
                <div className="container p-3 max-w-7xl my-0 mx-auto">
                    <ul className="flex justify-around">
                        {
                            categories.map((category: ICategory) =>
                                <li className="text-sm font-semibold text-white" key={category.attributes.title}>
                                    <Link to={`/category/${category.id}`}>{category.attributes.title}</Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </header >
    )
}