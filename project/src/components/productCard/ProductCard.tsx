import { HeartOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { IProductCardProps } from '../../interface';
import { addProduct } from '../../store/slices/basketSlice';

const ProductCard: React.FC<IProductCardProps> = ({ imageUrl, title, price, id }) => {
    const dispatch = useAppDispatch();
    const onClickAddProduct = () => {
        const item = {
            id,
            title,
            price,
            imageUrl,
        }
        dispatch(addProduct(item))
    }
    return (
        <>
            <Card
                actions={[
                    <div className='flex justify-around'>
                        <Button onClick={onClickAddProduct} className='border-none shadow-none'>В корзину</Button>
                        <HeartOutlined key="heart" />
                    </div>
                ]}
                hoverable
                style={{ width: 240 }}
                cover={<Link to={`/product/${id}`}><img className='h-full' alt="example" src={imageUrl}
                /></Link>}
            >
                <Link to={`/product/${id}`}>
                    <p>{title}</p>
                    <p className='mt-4'>{`${price} ₽`}</p>
                </Link>
            </Card>
        </>
    );
};

export default ProductCard;

//