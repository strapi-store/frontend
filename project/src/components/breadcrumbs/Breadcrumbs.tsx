import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => (
    <Breadcrumb
        items={[
            {
                title: <Link to="/">Главная</Link>,
            },
            {
                title: <Link to="">Стройматериалы</Link>,
            },
            {
                title: <Link to="">Продукт</Link>,
            }
        ]}
    />
);

export default Breadcrumbs;