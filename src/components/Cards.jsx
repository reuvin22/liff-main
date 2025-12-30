import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Cards({ cards }) {
  return (
    <div className="py-8">
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
                <div className="w-full sm:w-[90%] md:w-[500px] lg:w-[600px] rounded-lg p-6 flex flex-col justify-center items-center relative">
                  <div className="mb-4 text-center">
                    <span className="text-2xl sm:text-3xl font-bold text-[#8a63c0]">
                      {card.header}
                    </span>
                  </div>

                  <div className="text-base sm:text-xl text-[#333333] tracking-wider mb-4 text-center">
                    {card.instruction}
                  </div>

                  {card.image && (
                    <div className="w-full flex justify-center items-center">
                      <img
                        src={card.image}
                        alt="Card"
                        className="w-4/5 sm:w-3/4 lg:w-2/3 rounded-md mb-4"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '50vh',
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
