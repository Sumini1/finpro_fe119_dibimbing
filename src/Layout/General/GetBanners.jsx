import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetBanners } from "../../reducer/bannerSlice";
import { TECarousel, TECarouselItem } from "tw-elements-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GetBanners = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0); // State untuk menyimpan indeks slide saat ini

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
    <div className="relative">
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
                  <img
                    src={banner.imageUrl}
                    className="block w-full h-screen p-5"
                    alt={banner.name}
                  />
                </Link>
                <div className="absolute hidden p-5 mx-10 text-left text-white bottom-5 md:block">
                  <p className="text-3xl font-extrabold mt-[-100px] mb-5">
                    Lets Explore The World
                  </p>
                  <button className="px-4 py-2 font-bold text-black bg-white rounded">
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
      <div className="absolute left-0 transform -translate-y-1/2 top-1/2">
        <button
          className="bg-transparent border-0"
          aria-label="Previous"
          onClick={handlePrev}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="p-10 text-2xl font-extrabold text-white"
          />
        </button>
      </div>
      <div className="absolute right-0 transform -translate-y-1/2 top-1/2">
        <button
          className="bg-transparent border-0"
          aria-label="Next"
          onClick={handleNext}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            className="p-10 text-2xl font-extrabold text-white"
          />
        </button>
      </div>
    </div>
  );
};

export default GetBanners;
