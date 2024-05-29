import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

interface IProps {
    title: string;
    categoryImage: string;
}
const Block: React.FC<IProps> = ({ title, categoryImage }) => (
    <Card style={{ width: 390 }}>
        <div className="flex items-center justify-around">
            <div className="">
                <p>{title}</p>
                <ul>
                    <li><Link className='text-text-gray' to="/">Аксессуары</Link></li>
                    <li><Link className='text-text-gray' to="/">Доп. товары</Link></li>
                </ul>
            </div>
            <img className='max-w-36' src={categoryImage} alt="" />
        </div>
    </Card >
);

export default Block;