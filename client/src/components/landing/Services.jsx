// src/components/landing/Services.jsx
import React from 'react';
import {
  ShieldCheck,
  BellRing,
  MapPin,
  BookOpen,
  Users,
  LayoutGrid,
} from 'lucide-react';

// Service data organized for cleaner mapping
const serviceItems = [
  {
    icon: <LayoutGrid size={40} className="text-green-600" />,
    title: 'Farm Management',
    description: 'Manage flocks, cattle, and pigs with smart tools for feed, production, and records.',
  },
  {
    icon: <ShieldCheck size={40} className="text-green-600" />,
    title: 'Health & Biosecurity',
    description: 'Record daily logs, generate health reports, and detect diseases early for safer farms.',
  },
  {
    icon: <BellRing size={40} className="text-green-600" />,
    title: 'Smart Alerts',
    description: 'Get real-time alerts on health, feed, or production to respond quickly and efficiently.',
  },
  {
    icon: <MapPin size={40} className="text-green-600" />,
    title: 'Zipcode-Based Alerts',
    description: 'Stay informed with location-specific disease and weather alerts tailored to your farm’s area.',
  },
  {
    icon: <BookOpen size={40} className="text-green-600" />,
    title: 'Learning & Quizzes',
    description: 'Improve farmer knowledge with interactive quizzes and training for better biosecurity.',
  },
  {
    icon: <Users size={40} className="text-green-600" />,
    title: 'Team Collaboration',
    description: 'Seamlessly connect owners, supervisors, and vets for better, more informed decision-making.',
  },
];

const Services = () => (
  <section id="services" className="py-20 px-6 md:px-16 bg-white">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Everything You Need
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          From daily management to emergency alerts, our platform provides a complete solution for modern farming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceItems.map((service, index) => (
          <div
            key={index}
            className="group flex flex-col items-center text-center p-8 bg-green-50/50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-green-100 hover:-translate-y-2 transform transition-all duration-300 ease-in-out"
          >
            <div className="mb-5 bg-white p-4 rounded-full shadow-md">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;