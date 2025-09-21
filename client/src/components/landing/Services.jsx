// src/components/landing/Services.jsx
const Services = () => (
  <section id="services" className="py-16 px-6 md:px-16 text-center">
    <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Services</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-xl font-semibold mb-4">Farm Management</h3>
        <p className="text-gray-600">
          Track flocks, feed, and production with intuitive tools.
        </p>
      </div>
      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-xl font-semibold mb-4">Health Monitoring</h3>
        <p className="text-gray-600">
          Record daily logs and detect issues early for biosecurity.
        </p>
      </div>
      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
        <p className="text-gray-600">
          Owners, supervisors, and vets work together seamlessly.
        </p>
      </div>
    </div>
  </section>
);

export default Services;
