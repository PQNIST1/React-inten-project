import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CarouselImg from './carouselmg';
import FastTicket from '../FastBooking/fastTicket';
import { Link } from 'react-router-dom';
import { dataSlide } from '../../data/hashData';

const CarouselSlider = () => {
  const data = dataSlide;
  return (
    <div className='w-10/12  mx-auto my-5 custom-carousel relative flex justify-center'>
      <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} animationHandler={'slide'} interval={3000} showStatus={false} stopOnHover={true}>
        {data.map((item, index) => (
          <div key={index}>
            <Link>
              <CarouselImg data={item} key={item.id} />
            </Link>
          </div>

        ))}
      </Carousel>
      <FastTicket />

    </div>
  );
};

export default CarouselSlider;
