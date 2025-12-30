import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Cards({ cards }) {
  return (
    <div className="py-16">
      <div className="flex justify-center items-center">
        <Swiper 
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {cards && cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="w-[300px] sm:w-[400px] md:w-[500px] rounded-lg p-6">
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[#8a63c0]">
                    {card.header}
                  </span>
                </div>

                <div className="text-2xl text-[#333333] tracking-wider mb-4">
                  {card.instruction}
                </div>

                {card.image && <img src={card.image} alt="Card" className="w-full rounded-md mb-4" />}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Cards;
