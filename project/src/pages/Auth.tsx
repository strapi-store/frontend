import { Button, Checkbox, Form, FormProps, Input } from 'antd';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { authUser } from '../store/slices/userSlice';


type FieldType = {
    email: string;
    password: string;
    remember?: string;
};


export function Auth() {

    const user = useAppSelector((state) => state.user);
    const isAuth = Boolean(user.token);

    const dispatch = useAppDispatch();
    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        const user = {
            identifier: values.email,
            password: values.password
        }
        dispatch(authUser(user));
    };

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (
        < div className="container p-3 max-w-7xl my-0 mx-auto items-center flex flex-col" >
            <h3 className="mb-6 font-semibold text-4xl">Авторизация</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className=''
            >
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите свой пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>
                        Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit">
                        Авторизоваться
                    </Button>
                </Form.Item>
                <p>Вы еще не зарегистрированы на сайте?</p>
                <Link to={'/registration'}>Зарегистрироваться</Link>
            </Form>
        </div >
    )
}

