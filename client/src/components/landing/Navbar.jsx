// src/components/landing/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow fixed top-0 z-50">
      {/* Left - Brand */}
      <div className="text-2xl font-bold text-green-600">PoultryNexus</div>

      {/* Center - Links (Desktop) */}
      <ul className="hidden md:flex gap-8 text-gray-700 font-semibold">
        <li>
          <a href="#about" className="hover:text-green-600 transition">
            About
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-green-600 transition">
            Services
          </a>
        </li>
        <li>
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-green-600 transition">
            Contact
          </a>
        </li>
      </ul>

      {/* Right - Auth Buttons (Desktop) */}
      <div className="hidden md:flex gap-4">
        <Link
          to="/login"
          className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
        >
          Register
        </Link>
      </div>

      {/* Hamburger Button (Mobile) */}
      <button
        className="md:hidden flex flex-col space-y-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-0.5 bg-gray-800"></span>
        <span className="w-6 h-0.5 bg-gray-800"></span>
        <span className="w-6 h-0.5 bg-gray-800"></span>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-6 space-y-4 md:hidden">
          <a
            href="#about"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a
            href="#features"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#contact"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>

          {/* Auth Buttons (Mobile) */}
          <Link
            to="/login"
            className="px-4 py-2 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-green-600 hover:text-white transition w-32 text-center"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition w-32 text-center"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
