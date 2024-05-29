import React from 'react';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Card } from 'antd';
import { IProductCardProps } from '../../interface';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { addProduct, minusProduct, removeProduct } from '../../store/slices/basketSlice';

const ButtonGroup = Button.Group;

const BasketList: React.FC<IProductCardProps> = ({ imageUrl, title, price, id, countProduct }) => {
    const dispatch = useAppDispatch();

    const increase = () => {
        dispatch(addProduct({ id }));
    };

    const decline = () => {
        dispatch(minusProduct(id));
    };

    const onClickRemove = () => {
        dispatch(removeProduct(id));
    };
    return (
        <Card className='mb-2.5'>
            <div className="flex justify-between items-center">
                <Link to={`/product/${id}`}>
                    <Badge count={countProduct}>
                        <Avatar
                            shape="square"
                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                            src={imageUrl}
                        />
                    </Badge>
                    <p className="font-normal text-xs text-text-gray">{title}</p>
                </Link>
                <ButtonGroup>
                    <Button onClick={decline} icon={<MinusOutlined />} />
                    <Button onClick={increase} icon={<PlusOutlined />} />
                    <Button onClick={onClickRemove} icon={<DeleteOutlined />} />
                </ButtonGroup>
                <p className="my-5">{`${price} ₽`}</p>
            </div>
        </Card >

    );
};

export default BasketList;