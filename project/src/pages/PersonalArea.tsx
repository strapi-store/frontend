import { Avatar, Button, Card, Form, Input } from "antd";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { PostOrder } from "../interface";
import { useEffect } from "react";
import { createOrder, fetchOrders } from "../store/slices/orderSlice";


export function PersonalArea() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const orders = useAppSelector((state) => state.orders.orders);
    const { items, totalPrice } = useAppSelector((state) => state.basket);
    const userData = localStorage.getItem('userData');
    const { id, email } = userData ? JSON.parse(userData) : [];
    const userOrders = orders.filter((item) => item.attributes.users_permissions_user.data?.id === email);
    console.log(userOrders)

    const [form] = Form.useForm();

    const onFinish = () => {
        const newOrder: PostOrder =
        {
            data: {
                products: items,
                users_permissions_user: id,
                totalPrice: String(totalPrice)
            }
        }

        dispatch(createOrder(newOrder))
            .then(() => {
            }
            )
            .catch(console.log)
    };


    return (
        <div className="container p-3 max-w-7xl my-0 mx-auto">
            <Breadcrumbs />
            <h3 className="items-center flex flex-col mb-6 font-semibold text-4xl">Личный кабинет</h3>
            <div className="">
                <div className="">
                    <h3 className="mb-6 font-semibold text-4xl">Мои заказы</h3>
                    {userOrders ? <div className="">
                        {
                            userOrders.map((item, number) => (
                                <Card className='mb-2.5 max-w-2xl'>
                                    <p>Заказ № {number + 1}</p>
                                    {item.attributes.products.map((item) =>
                                        <div className="flex content-center" key={item.id} >
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
                                    )}
                                </Card >
                            ))
                        }
                    </div> : <p>Заказов пока что нет</p>}
                </div>
                <div className="mt-5">
                    <h3 className="mb-6 font-semibold text-4xl">Изменить личные данные</h3>
                    <Form
                        form={form}
                        name="updatePassword"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="currentPassword"
                            label="Пароль"
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Пароль"
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="passwordConfirmation"
                            label="Подтвердите пароль"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, подтвердите свой пароль!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароль, который вы ввели, не соответствует!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Изменить
                        </Button>
                    </Form>
                </div>
            </div>

        </div >

    )
}