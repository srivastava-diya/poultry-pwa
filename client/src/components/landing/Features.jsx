// src/components/landing/Features.jsx
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import dashboard_img from "../../assets/dashboard.png";
import dailylog_img from "../../assets/dailylog.png";
import roles_img from "../../assets/roles.jpeg";
import quiz_img from "../../assets/quiz.jpeg";
import { useTranslation } from 'react-i18next';

// Feature data with full text as keys
const featureData = [
  {
    title: 'Real-Time Tracking & Analytics',
    description: 'Monitor your entire operation from one powerful dashboard. Track flock health, feed consumption, and production metrics in real-time to make data-driven decisions.',
    points: [
      'Live dashboards for at-a-glance insights',
      'Historical data and performance reports',
      'Customizable alerts for critical events',
    ],
    image: dashboard_img,
    imageAlt: 'Screenshot of the analytics dashboard',
  },
  {
    title: 'Daily Health Logs & Biosecurity',
    description: 'Simplify health management with easy-to-use digital logs. Record observations, track vaccinations, and receive smart alerts for potential health issues before they spread.',
    points: [
      'Mobile-friendly daily logging',
      'Automated health trend analysis',
      'Secure access for veterinarians',
    ],
    image: dailylog_img,
    imageAlt: 'A picture showing the health logging feature',
  },
  {
    title: 'Secure Role-Based Access',
    description: 'Ensure the right people have the right access. Our platform allows you to define roles for farm owners, supervisors, and veterinarians, protecting sensitive data and streamlining collaboration.',
    points: [
      'Admin, Supervisor, and Vet roles',
      'Permission controls for specific features',
      'Complete audit trail for accountability',
    ],
    image: roles_img,
    imageAlt: 'Diagram showing different user roles and permissions',
  },
  {
    title: 'Early Disease Detection Quiz',
    description: 'Empower yourself with our interactive diagnostic tool. By answering a series of guided questions about symptoms, you can get a preliminary identification of potential diseases, enabling you to act faster.',
    points: [
      'Guided symptom-based questions',
      'Instant preliminary analysis and results',
      'Recommendations for immediate action',
    ],
    image: quiz_img,
    imageAlt: 'A tablet displaying the disease detection quiz interface',
  }
];

const Features = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            {t('Powerful Features, Simple Interface')}
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            {t('We built our platform with the tools you need to enhance productivity and ensure farm biosecurity.')}
          </p>
        </div>

        <div className="space-y-20">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center gap-12 md:gap-16"
            >
              {/* Image Section */}
              <div className={`w-full md:w-1/2 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <img
                  src={feature.image}
                  alt={t(feature.imageAlt)}
                  className="rounded-2xl w-full h-auto object-cover border-4 border-green-500 shadow-[0_0_20px_#22c55e]"
                />
              </div>

              {/* Text Content Section */}
              <div className="w-full md:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {t(feature.title)}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(feature.description)}
                </p>
                <ul className="space-y-4">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{t(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
