import React from 'react';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { PostUser } from '../interface';
import { useAppDispatch } from '../store/hooks';
import { registerUser } from '../store/slices/userSlice';
import dayjs from 'dayjs';


const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Registration: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = (values: PostUser) => {
        const newUser =
        {
            username: values.name,
            email: values.email,
            surname: values.surname,
            phoneNumber: values.prefix + values.phone,
            password: values.password,
            birth: dayjs(values.birth).format('YYYY-MM-DD')
        }

        dispatch(registerUser(newUser))
            .then(() => {
                navigate("/auth")
            }
            )
            .catch(console.log)

    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="7">+7</Option>
            </Select>
        </Form.Item>
    );


    return (
        <>
            <div className="container p-3 max-w-7xl my-0 mx-auto items-center flex flex-col">
                <h3 className="mb-6 font-semibold text-4xl">Регистрация</h3>
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '7' }}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="name"
                        label="Имя"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите имя!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="surname"
                        label="Фамилия"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите фамилию!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="birth" label="Дата рождения" rules={[
                        {
                            required: true,
                            message: 'Пожалуйста, введите дату рождения!',
                        },
                    ]}>
                        <DatePicker placeholder="" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'Введен неверный адрес электронной почты!',
                            },
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой адрес электронной почты!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Пароль"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста, введите свой пароль!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
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

                    <Form.Item
                        name="phone"
                        label="Номер телефона"
                        rules={[{ required: true, message: 'Пожалуйста, введите свой номер телефона!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            Я прочитал <Link to="">соглашение</Link>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button htmlType="submit">
                            Регистрация
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Registration;