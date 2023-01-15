import React from "react";
import { Grid, Pagination, Autoplay, Thumbs, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

function Slider({
  loop,
  xs,
  sm,
  md,
  lg,
  xl,
  itemAs,
  items,
  autoplay = undefined,
  ...props
}) {
  const Component = itemAs;

  const settings = {
    modules: [Autoplay, Pagination, Grid, Thumbs, Navigation],
    spaceBetween: 0,
    slidesPerView: 1,
    pagination: {},
    loop: loop,
    navigation: true,

    breakpoints: {
      ...(xs && {
        0: xs,
      }),
      ...(sm && {
        576: sm,
      }),
      ...(md && {
        768: md,
      }),
      ...(lg && {
        992: lg,
      }),
      ...(xl && {
        1200: xl,
      }),
    },
  };

  return (
    <div className="custom-slider">
      <Swiper {...settings} {...props} dir="rtl">
        {items &&
          itemAs &&
          items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="item-container">
                <Component item={item} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default React.memo(Slider);
