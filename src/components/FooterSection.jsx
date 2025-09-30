import React from 'react';
import noira from '/noira.svg';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const bgColor = isDarkMode ? 'bg-[#0f111d]' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const mutedText = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const divider = isDarkMode ? 'border-white/10' : 'border-gray-300';

  return (
    <footer className={`${bgColor} ${textColor} px-6 md:px-20 py-12`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Socials */}
        <div>
          <div className="mb-4">
            <img src={noira} alt="Noira Logo" className="w-50" />
          </div>

          <div className="flex gap-4 text-[#C49E5B] text-lg">
            <a href="https://www.instagram.com/noira._london/" aria-label="Instagram" className="hover:opacity-80">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61579799001823" aria-label="Facebook" className="hover:opacity-80">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/in/noira-a62aa8378/" aria-label="Twitter" className="hover:opacity-80">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-[#C49E5B] font-semibold mb-4">Services</h4>
          <ul className={`space-y-2 text-sm ${mutedText}`}>
            <li>
              <Link to="/allservicespage" className="block hover:underline hover:text-primary transition">
                Classic Reset
              </Link>
            </li>
            <li>
              <Link to="/allservicespage" className="block hover:underline hover:text-primary transition">
                Deep Release
              </Link>
            </li>
            <li>
              <Link to="/allservicespage" className="block hover:underline hover:text-primary transition">
                The NOIRA Ritual
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[#C49E5B] font-semibold">Contact</h4>
          <ul className={`space-y-3 text-sm ${mutedText}`}>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#C49E5B]" />
              +44 7350 700055
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#C49E5B]" />
              info@noira.co.uk
            </li>
            <li className="flex items-center gap-2">
              <FaClock className="text-[#C49E5B]" />
              24/7 Available
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#C49E5B]" />
              London & surrounding boroughs
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-white/10 mt-10 mt-10'></div>

      {/* Policies Links */}
      <div className="max-w-7xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
        <Link to="/privacypolicy" className="hover:underline hover:text-primary transition">
          Privacy Policy
        </Link>
        <Link to="/termsandcondition" className="hover:underline hover:text-primary transition">
          Terms & Conditions
        </Link>
        <Link to="/codeofethics" className="hover:underline hover:text-primary transition">
          Code of Ethics
        </Link>
        <Link to="/gpdrstatement" className="hover:underline hover:text-primary transition">
          GDPR Statement
        </Link>
        <Link to="/cancellationpolicy" className="hover:underline hover:text-primary transition">
          Cancellation Policy
        </Link>
        <Link to="/refundpolicy" className="hover:underline hover:text-primary transition">
          Refund Policy
        </Link>
        <Link to="/healthandsafetypolicy" className="hover:underline hover:text-primary transition">
          Health & Safety
        </Link>
        <Link to="/accessibility" className="hover:underline hover:text-primary transition">
          Accessibility
        </Link>

      </div>

      <div className='text-center border-t border-white/10 mt-10 pt-10'>
        <h4 className="text-[#C49E5B] font-semibold mb-4">Client Info</h4>
        <ul className={`space-y-2 text-sm ${mutedText}`}>
          <li>
            <a
              href="/pdfs/noira_massage_setup_updated.pdf"
              download="Massage-Setup-Guide.pdf"
              className="block hover:underline hover:text-primary transition"
            >
              Massage Setup & Preparation Guide (PDF)
            </a>
          </li>
        </ul>
      </div>

      {/* Secure Payments Section */}
      <div className="max-w-7xl mx-auto flex mb-10 mt-8 justify-center gap-6">
        <div className="flex items-center gap-2 text-sm text-white">
          <FaCheckCircle className="text-[#C49E5B] text-lg" />
          <span className="font-medium">Secure Payments</span>
        </div>
        <img src="./stripe_logo.png" alt="Stripe" className="h-8" />
      </div>

      {/* Divider */}
      <div className={`border-t ${divider} pt-6 text-center text-sm ${mutedText}`}>
        © 2025 NOIRA. A luxury without noise. Available to the discerning few
      </div>
    </footer>
  );
};

export default Footer;
