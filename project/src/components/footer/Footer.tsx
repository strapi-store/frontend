import { Link } from "react-router-dom";
import { footerList } from "../../helpers";
import { FooterList } from "./FooterList";
import { Input, Space } from "antd";
import { RightOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { FaTelegram } from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";

export function Footer() {
    return (
        <footer className="bg-blue-dark py-16">
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <div className="flex justify-between">
                    {
                        footerList.map((item =>
                            <FooterList key={item.title} title={item.title} list={item.list} />
                        ))
                    }
                    <ul>
                        <li className="text-base text-white font-semibold">
                            Контакты
                        </li>
                        <li>
                            <Link to={'/'} className="text-sm font-semibold text-text-gray">
                                8 800 700-44-41
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className="text-sm font-semibold text-text-gray">
                                support@gamepark.ru
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className="text-sm font-semibold text-text-gray">
                                Связаться с нами
                            </Link>
                        </li>
                    </ul>
                    <div className="">
                        <p className="text-base text-white font-semibold">
                            Подписаться на рассылку
                        </p>
                        <Space.Compact style={{ width: '100%' }} className="my-5">
                            <Input placeholder="Введите ваш email" addonAfter={<RightOutlined />} />
                        </Space.Compact>
                        <div className="flex justify-around">
                            <Link to={'https://web.whatsapp.com/'}>
                                <WhatsAppOutlined style={{ fontSize: '30px' }} />
                            </Link>
                            <Link to={"https://web.telegram.org/a/"}>
                                <FaTelegram style={{ fontSize: '30px' }} />
                            </Link>
                            <Link to={'https://vk.com/'}>
                                <SlSocialVkontakte style={{ fontSize: '30px' }} />
                            </Link>



                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}