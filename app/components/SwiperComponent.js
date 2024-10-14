/* eslint-disable @next/next/no-img-element */
// app/components/SwiperComponent.js
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperComponent = () => {
  const [slides, setSlides] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://esanapi.utipong.info/api/coverimg/getimg-slide/"
        );
        const data = await response.json();

        console.log("API Response:", data); // Log the response to check the structure

        // Extract image URLs from the response
        const imageUrls = data.map((slide) => slide.image); // Create an array of image URLs
        setSlides(imageUrls); // Set the slides state with the array of image URLs
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>; // Loading state

  // Check if slides is an array before mapping
  if (!Array.isArray(slides) || slides.length === 0) {
    return <div>No slides available.</div>; // Handle case where no slides are available
  }

  return (
    <div>
    <div className="max-w-[1200px] max-h-[500px] w-[100%] h-[100%] mx-auto mt-3 rounded-lg">
      {/* Container for the Swiper */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay:  5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((imgUrl, index) => (
          <SwiperSlide key={index}>
            <img
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="object-fill rounded-lg max-w-[1200px] max-h-[500px] w-[100%] h-[100%]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </div>
  );
};

export default SwiperComponent;
