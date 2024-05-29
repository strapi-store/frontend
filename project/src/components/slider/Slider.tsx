import React, { useEffect } from 'react';
import { Carousel } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ISlider } from '../../interface';
import { Link } from 'react-router-dom';
import { fetchSliders } from '../../store/slices/sliderSlice';


const contentStyle: React.CSSProperties = {
    height: '400px',
    borderRadius: "24px",
};

export function Slider() {
    const dispatch = useAppDispatch();
    const sliders = useAppSelector((state) => state.sliders.sliders);
    useEffect(() => {
        dispatch(fetchSliders());
    }, [dispatch])
    return (
        <div className="container p-3 max-w-7xl my-0 mx-auto">
            <Carousel autoplay>
                {
                    sliders.map((slider: ISlider) =>
                        <div key={slider.attributes.url}>
                            <Link to={'/'}>
                                <img className='w-full' style={contentStyle} src={slider.attributes.banner.data[0].attributes.url} alt="" />
                            </Link>
                        </div>
                    )
                }
            </Carousel>
        </div >
    )



}
