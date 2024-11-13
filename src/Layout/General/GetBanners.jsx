import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetBanners } from "../../reducer/bannerSlice";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiArrowGoForwardLine } from "react-icons/ri";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams, Link } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

const GetBanners = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchGetBanners());
  }, [dispatch]);

  const { isLoading, data } = useSelector((state) => state.banner);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600">
      <TECarousel showControls={false} showIndicators={false} ride="carousel">
        <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
          {data && data.length > 0 ? (
            data.map((banner, index) => (
              <TECarouselItem
                key={banner.id}
                itemID={index + 1}
                className={`relative float-left ${
                  index === currentIndex ? "" : "hidden"
                } -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none`}
              >
                <Link to={`/banner/${banner.id}`}>
                  <div className="overflow-hidden rounded-md ">
                    <img
                      src={banner.imageUrl}
                      className="block w-full h-[300px] rounded-md md:h-[500px]"
                      alt={banner.name}
                    />
                  </div>
                </Link>
                {/* Deskripsi Banner */}
                <div className="absolute top-0 p-5 mb-2 text-left text-white mt-36 left-5 md:block md:top-36 md:text-xl">
                  <p className="mb-3 text-xl font-extrabold md:text-3xl md:mb-5">
                    Lets Explore The World
                  </p>
                  <button className="px-4 py-2 mb-2 font-bold text-black bg-white rounded md:mb-7">
                    Book Now
                  </button>
                </div>
              </TECarouselItem>
            ))
          ) : (
            <div>No banners available</div>
          )}
        </div>
      </TECarousel>

      {/* Kontrol Panah */}

      <div className="absolute left-12  md:left-10 transform -translate-y-1/2 top-[270px] md:top-[450px]">
        <button
          className="bg-transparent border-0"
          aria-label="Previous"
          onClick={handlePrev}
        >
          <RiArrowGoBackLine className="text-2xl font-extrabold text-white md:text-4xl" />
        </button>
      </div>
      <div className="absolute left-24  transform -translate-y-1/2 top-[270px] md:top-[450px]">
        <button
          className="bg-transparent border-0"
          aria-label="Next"
          onClick={handleNext}
        >
          <RiArrowGoForwardLine className="text-2xl font-extrabold text-white md:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default GetBanners;
