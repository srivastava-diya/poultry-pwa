
import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {t('Contact Us')}
      </h2>
      <p className="max-w-2xl mx-auto text-gray-600 mb-6">
        {t('Have questions? Reach out to us and we will be happy to help.')}
      </p>
      <a
        href="mailto:support@poultrynexus.com"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-full shadow hover:bg-green-700 transition"
      >
        support@poultrynexus.com
      </a>
    </section>
  );
};

export default Contact;
