
"use client";

import React from "react";
import { motion } from "motion/react";
import { ImagesSlider } from "../../components/ui/images-slider";
import img1 from "../../assets/cows.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img7 from "../../assets/7.png";
import { useTranslation } from "react-i18next";


const images = [
  img1,img2,img3,img4,img7
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  return (
    <ImagesSlider className="h-screen relative" images={images} >
      
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-50 flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 pb-3  bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700">
          {t("Welcome to PoultryNexus")}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8  text-white">
          {t("Smart farm management combined with strong biosecurity practices ensures healthier animals, sustainable agriculture, and a resilient future for farmers, consumers, and the environment through care.")}
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/register"
            className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            {t("Get Started")}
          </a>
          <a
            href="#about"
            className="border border-white px-6 py-3 rounded-full text-amber-100 font-semibold hover:bg-white hover:text-yellow-600 transition"
          >
            {t("Learn More")}
          </a>
        </div>
      </motion.div>
    </ImagesSlider>
  );
};

export default Hero;
