'use client'
import Image from "next/image";
import { useState, useEffect } from "react";
import img1 from '../images/Screenshot from 2024-10-12 14-58-43.png'
import img2 from '../images/Screenshot from 2024-10-12 17-13-04.png'
import img3 from '../images/Screenshot from 2024-10-14 17-33-06.png'
import img4 from '../images/Screenshot from 2024-10-12 17-43-03.png'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Slider = () => {
  const images = [
    img1,
    img2,
    img3,
    img4
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 3000);
    return () => clearInterval(autoSlide); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden">
      <div
        className="absolute top-0 left-0 flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full object-cover flex-shrink-0 h-[50vh]"
          />
        ))}
      </div>
      
      {/* Previous and Next Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <MdOutlineKeyboardArrowLeft className="h-10 w-10"/>
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <MdOutlineKeyboardArrowRight className="h-10 w-10"/>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
