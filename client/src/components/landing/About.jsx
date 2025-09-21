import React from 'react';
import image13 from "../../assets/13.jpg"
import image15 from "../../assets/15.jpg"


const About = () => (
  <section id="about" className="py-20 md:py-28 bg-white">
    <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
       
        <div className="relative h-80 md:h-96">
          <div 
            className="absolute top-0 left-0 w-3/4 h-3/4 bg-green-100 rounded-2xl shadow-lg overflow-hidden transform -rotate-3 transition-transform duration-500 hover:rotate-0"
          >
            <img src={image13} alt="farm animals" />
          </div>

          
          <div 
            className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-200 rounded-2xl shadow-2xl border-4 border-white overflow-hidden transform rotate-3 transition-transform duration-500 hover:rotate-0"
          >
            <img src={image15} alt="chickens" />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <h3 className="text-yellow-400 font-extrabold tracking-wider uppercase mb-3">
            Who We Are
          </h3>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight">
            Smarter Farming, Healthier Flocks.
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            PoultryNexus is designed to simplify farm management and improve
            biosecurity. With real-time data, collaboration, and smart insights,
            we empower owners, supervisors, and vets to keep poultry healthier and
            farms more productive.
          </p>
          <a
            href="#features"
            className="inline-block bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
          >
            Discover Our Features
          </a>
        </div>

      </div>
    </div>
  </section>
);

export default About;