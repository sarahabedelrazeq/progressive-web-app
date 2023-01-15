import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowRight } from "assets/images/arrowRight.svg";
import { ReactComponent as ArrowLeft } from "assets/images/arrowLeft.svg";
import styles from "./style.module.css";

export default function Slider({ glass_variants, setActiveItem }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [activeImage, setActiveImage] = React.useState(0);
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);

  React.useEffect(() => {
    if (
      glass_variants &&
      glass_variants[activeIndex] &&
      glass_variants[activeIndex]?.frame_variant?.colour?.name
    )
      setActiveItem(glass_variants[activeIndex]?.frame_variant);
  }, [activeIndex, glass_variants, setActiveItem]);

  const overlaySliderNext = () => {
    const count = glass_variants[activeIndex]?.media?.length;
    setActiveImage((prev) => (prev + 1) % count);
  };

  const overlaySliderPrev = () => {
    const count = glass_variants[activeIndex]?.media?.length;
    setActiveImage((prev) => (prev > 0 ? prev - 1 : count - 1));
  };

  return (
    <div className={styles.slider}>
      <div className={styles.sliderMain}>
        <div className={styles.sliderOverlay}>
          <div className={styles.sliderOverlayPrev}>
            <button onClick={overlaySliderPrev} className={styles.overlayBtn}>
              <ArrowLeft />
            </button>
          </div>
          <div className={styles.sliderOverlayLink}>
            <Link className={styles.overlayLink} to="#">
              go to the glass page
            </Link>
          </div>
          <div className={styles.sliderOverlayNext}>
            <button onClick={overlaySliderNext} className={styles.overlayBtn}>
              <ArrowRight />
            </button>
          </div>
        </div>
        {thumbsSwiper && (
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            style={{ width: "100%" }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            onSwiper={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {glass_variants?.map(({ media, frame_variant }, index) => (
              <SwiperSlide key={index}>
                <Swiper spaceBetween={0} slidesPerView={1} loop>
                  <img
                    src={media[activeImage]?.url}
                    alt={frame_variant?.name}
                    style={{ width: "100%" }}
                    loading="lazy"
                  />
                </Swiper>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationBtn}>
          <button className={styles.paginationBtn}>
            <span>+ Try at Home</span>
          </button>
        </div>
        <div className={styles.paginationSlider}>
          {thumbsSwiper && (
            <div
              className={styles.paginationSwatcher}
              style={{
                width: `${thumbsSwiper.slidesSizesGrid[0] / 2}px`,
                marginInline: `${thumbsSwiper.slidesSizesGrid[0] / 4}px`,
                transform: `translateX(${thumbsSwiper.slidesGrid[activeIndex]}px)`,
              }}
            ></div>
          )}
          <div className={styles.paginationSliderContainer}>
            <Swiper
              spaceBetween={0}
              slidesPerView={glass_variants.length}
              onSwiper={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                setThumbsSwiper(swiper);
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              {glass_variants?.map(({ media, frame_variant }, index) => (
                <SwiperSlide key={index} className={styles.swiperSlide}>
                  <div
                    className={styles.swiperPaginationImage}
                    style={{
                      backgroundImage: `url(${frame_variant?.colour?.media[0]?.url})`,
                    }}
                    alt={frame_variant?.colour?.name}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
