import { Avatar, Button, Card, Form, Input } from "antd";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import TextArea from "antd/es/input/TextArea";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { PostOrder } from "../interface";
import { createOrder } from "../store/slices/orderSlice";

export function Order() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.basket.items);
    const { items, totalPrice } = useAppSelector((state) => state.basket);
    const userEmail = localStorage.getItem('userData');

    const onFinish = () => {
        const newOrder: PostOrder =
        {
            data: {
                products: items,
                users_permissions_user: userEmail,
                totalPrice: String(totalPrice)
            }
        }
        dispatch(createOrder(newOrder))
            .then(() => {
                console.log(JSON.stringify(newOrder))
            }
            )
            .catch((err) => {
                console.log(err)
            })
    };
    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto">
                <Breadcrumbs />
                <h3 className="mb-6 font-semibold text-4xl">Оформление заказа</h3>
                <div className="flex justify-between">
                    <div className="flex-col w-1/2 ">
                        <Card className='mb-2.5'>
                            <p className="mb-5 font-semibold text-2xl">
                                <Avatar className="bg-blue-dark w-8 mr-5 text-sm font-semibold">
                                    1
                                </Avatar>
                                Ваши данные
                            </p>
                            <Form
                                labelCol={{ flex: '110px' }}
                                labelAlign="left"
                                labelWrap
                                wrapperCol={{ flex: 1 }}
                                colon={false}
                            >
                                <Form.Item name="username" rules={[{
                                    required: true,
                                    message: 'Пожалуйста, введите ФИО!',
                                },]}>
                                    <Input placeholder="ФИО*" />
                                </Form.Item>
                                <Form.Item name="email" rules={[{
                                    required: true,
                                    message: 'Пожалуйста, введите электронную почту!',
                                }]}>
                                    <Input placeholder="E-Mail*" />
                                </Form.Item>
                                <Form.Item name="number" rules={[{
                                    required: true,
                                    message: 'Пожалуйста, введите номер телефона!'
                                }]}>
                                    <Input placeholder="Телефон*" />
                                </Form.Item>
                                <Form.Item name="message">
                                    <TextArea placeholder="Ваше сообщение" />
                                </Form.Item>
                            </Form>
                        </Card>
                        <Card className='mb-2.5'>
                            <p className="mb-5 font-semibold text-2xl">
                                <Avatar className="bg-blue-dark w-8 mr-5 text-sm font-semibold">
                                    2
                                </Avatar>
                                Состав заказа
                            </p>
                            {
                                products.map((item) => (
                                    <div className="flex content-center" key={item.id}>
                                        <Avatar
                                            shape="square"
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                            src={item.imageUrl}
                                        />
                                        <div className="ml-24">
                                            <p className="font-normal text-xs text-text-gray">{item.title}</p>
                                            <p className="my-5">
                                                <span className="mr-2">{item.countProduct} шт.</span>
                                                <span>{item.price} ₽</span>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }


                        </Card>
                        <Card className='mb-2.5'>
                            <div className="flex justify-between items-center">
                                <p className="mb-5 font-semibold text-2xl">
                                    <Avatar className="bg-blue-dark w-8 mr-5 text-sm font-semibold">
                                        3
                                    </Avatar>
                                    Информация о доставке
                                </p>
                            </div>
                        </Card>
                        <Card className='mb-2.5'>
                            <div className="flex justify-between items-center">
                                <p className="mb-5 font-semibold text-2xl">
                                    <Avatar className="bg-blue-dark w-8 mr-5 text-sm font-semibold">
                                        4
                                    </Avatar>
                                    Информация об оплате
                                </p>
                            </div>
                        </Card>
                        <Button onClick={onFinish}>
                            Оформить заказ
                        </Button>
                    </div>
                    <div className="">
                        <p className="text-2xl font-semibold">Итого</p>
                        <p className="my-5">{totalPrice} ₽</p>
                        <Button onClick={onFinish}>Оформить заказ</Button>
                    </div>
                </div>
            </div >
        </>
    )
}