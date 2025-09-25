// src/components/landing/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow fixed top-0 z-50">
      
      <Link to="/" className="text-2xl font-bold text-green-600">
        PoultryNexus
      </Link>

      <ul className="hidden md:flex gap-8 ml-30 text-gray-700 font-semibold">
        <li>
          <Link
            to="/"
            className={`transition relative ${
              isActive("/") ? "text-green-600 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-green-600" : "hover:text-green-600"
            }`}
          >
            {t("Home")}
          </Link>
        </li>
        <li>
          <a href="#about" className="hover:text-green-600 transition">
            {t("About")}
          </a>
        </li>
        <li>
          <a href="#services" className="hover:text-green-600 transition">
            {t("Services")}
          </a>
        </li>
        <li>
          <a href="#features" className="hover:text-green-600 transition">
            {t("Features")}
          </a>
        </li>
        <li>
          <a href="#contact" className="hover:text-green-600 transition">
            {t("Contact")}
          </a>
        </li>
      </ul>

      
      <div className="hidden md:flex gap-4 items-center">
        <Link
          to="/login"
          className={`px-4 py-2 border-2 rounded-full font-semibold transition ${
            isActive("/login")
              ? "bg-green-600 text-white"
              : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          }`}
        >
          {t("Login")}
        </Link>
        <Link
          to="/register"
          className={`px-4 py-2 rounded-full font-semibold transition ${
            isActive("/register")
              ? "bg-green-700 text-white"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {t("Register")}
        </Link>

        {/* Language Switch */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => i18n.changeLanguage("en")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            EN
          </button>
          <button
            onClick={() => i18n.changeLanguage("hi")}
            className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
          >
            हिंदी
          </button>
        </div>
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
          <Link
            to="/"
            className={`font-semibold ${
              isActive("/")
                ? "text-green-600 underline"
                : "text-gray-700 hover:text-green-600"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {t("Home")}
          </Link>
          <a
            href="#about"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            {t("About")}
          </a>
          <a
            href="#services"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            {t("Services")}
          </a>
          <a
            href="#features"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            {t("Features")}
          </a>
          <a
            href="#contact"
            className="text-gray-700 font-semibold hover:text-green-600"
            onClick={() => setIsOpen(false)}
          >
            {t("Contact")}
          </a>

          {/* Auth Buttons (Mobile) */}
          <Link
            to="/login"
            className={`px-4 py-2 border-2 rounded-full font-semibold transition w-32 text-center ${
              isActive("/login")
                ? "bg-green-600 text-white"
                : "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {t("login")}
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-full font-semibold transition w-32 text-center ${
              isActive("/register")
                ? "bg-green-700 text-white"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {t("register")}
          </Link>

          {/* Language Switch (Mobile) */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                i18n.changeLanguage("en");
                setIsOpen(false);
              }}
              className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
            >
              EN
            </button>
            <button
              onClick={() => {
                i18n.changeLanguage("hi");
                setIsOpen(false);
              }}
              className="text-sm px-2 py-1 border rounded hover:bg-gray-100"
            >
              हिंदी
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
