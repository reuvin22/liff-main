import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Cards({ cards }) {
  return (
    <div className="px-2">
      <div className="flex justify-center items-center">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop
        >
          {cards &&
            cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-screen md:w-[500px] lg:w-[600px] rounded-lg flex flex-col justify-center items-center relative">
                  <div className='px-4'>
                    <div className="mb-4 text-start">
                        <span className="text-2xl sm:text-3xl font-bold text-[#8a63c0]">
                        {card.header}
                        </span>
                    </div>

                    <div className="text-base sm:text-xl text-[#333333] tracking-wider mb-4">
                        {card.instruction}
                    </div>
                  </div>

                  {card.image && (
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={card.image}
                        alt="Card"
                        className="w-full sm:w-[100%] lg:w-[70%] rounded-md mb-4"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '60vh',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Cards;
