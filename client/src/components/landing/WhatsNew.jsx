import React from 'react';

// Reusing the same SVG icons as they are clean and modern

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const HealthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);


const WhatsNew = () => (
  <section id="whatsnew" className="py-20 md:py-28 bg-gray-50"> {/* Retain bg-gray-50 for a subtle section break */}
    <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
      
      {/* ====== Heading Section ====== */}
      <div className="text-center mb-16">
        <h3 className="text-yellow-400 font-extrabold tracking-wider uppercase mb-3"> {/* Slightly deeper yellow */}
          Our Latest Updates
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4"> {/* Darker, richer green */}
          Innovations in Farm Tech
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          We're constantly improving to bring you the best tools for farm management. Here are our latest features designed to boost your productivity and biosecurity.
        </p>
      </div>

      {/* ====== Features Grid ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Card 1: Real-Time Dashboards */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left border border-gray-100"> {/* Added border, increased padding, rounded corners, stronger shadow */}
          <div className="bg-green-50 text-green-700 rounded-full w-18 h-18 flex items-center justify-center mb-6 p-2"> {/* Muted green background for icon, slightly larger */}
            <DashboardIcon />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Real-Time Dashboards</h3>
          <p className="text-gray-600 leading-relaxed"> {/* Added leading-relaxed for better line spacing */}
            Monitor flock health, feed levels, and environmental data instantly with our new customizable analytics dashboards.
          </p>
        </div>

        {/* Card 2: Enhanced Mobile App */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left border border-gray-100">
          <div className="bg-green-50 text-green-700 rounded-full w-18 h-18 flex items-center justify-center mb-6 p-2">
            <MobileIcon />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Enhanced Mobile Support</h3>
          <p className="text-gray-600 leading-relaxed">
            Manage your farm from anywhere with a faster, more intuitive mobile experience, now with offline support.
          </p>
        </div>

        {/* Card 3: Smart Health Alerts */}
        <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-start text-left border border-gray-100">
          <div className="bg-green-50 text-green-700 rounded-full w-18 h-18 flex items-center justify-center mb-6 p-2">
            <HealthIcon />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Smart Health Alerts</h3>
          <p className="text-gray-600 leading-relaxed">
            Get proactive notifications and health predictions powered by AI to prevent disease outbreaks before they start.
          </p>
        </div>

      </div>
    </div>
  </section>
);

export default WhatsNew;