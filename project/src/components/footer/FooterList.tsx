import { Link } from "react-router-dom";
import { ICategory, IFooterList } from "../../interface";

export function FooterList({ title, list }: IFooterList) {
    return (
        <ul>
            <li className="text-base text-white font-semibold">
                {title}
            </li>
            {
                list.map((item: ICategory) =>
                    <li key={item.title}>
                        <Link to={item.url} className="text-sm font-semibold text-text-gray">{item.title}</Link>
                    </li>
                )
            }

        </ul>
    )
}