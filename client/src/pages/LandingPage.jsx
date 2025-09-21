// src/pages/LandingPage.jsx
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import About from "../components/landing/About";
import Services from "../components/landing/Services";
import Features from "../components/landing/Features";
import WhatsNew from "../components/landing/WhatsNew";
import Contact from "../components/landing/Contact";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main className="pt-10"> 
        <Hero />
        <WhatsNew />
        <About />
        <Services />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;