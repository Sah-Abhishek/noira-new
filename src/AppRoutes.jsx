
import React from 'react';
import { Routes, Route } from 'react-router-dom';


import CareerPage from './pages/CareerPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/About.jsx';
import AdmiLogin from './pages/AdminLogin.jsx';
import AdminDashoboard from './pages/AdminDashboard.jsx';
import OtpInput from './pages/OtpInput.jsx';
import ProtectedRoute from './components/UserProtectedRoute.jsx';
import UserSignup from './pages/UserSignup.jsx';
import UserLogin from './pages/UserLogin.jsx';
import TherapistDashboard from './pages/TherapistDashobard.jsx'
import ServicesPage from './pages/ServicesPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ChooseTherapistPage from './pages/ChooseTherapistPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import LoaderPage from './pages/LoaderPage.jsx';
import UserProtectedRoute from './components/UserProtectedRoute.jsx';
import TherapistProtectedRoute from './components/TherapistProtectedRoute.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/careers" element={<CareerPage />} />
      {/* Add more routes as needed */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/adminlogin" element={<AdmiLogin />} />
      <Route path="/otpinput/:purpose" element={<OtpInput />} />
      <Route path="/usersignup" element={<UserSignup />} />
      <Route path="/userlogin" element={<UserLogin />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/loading" element={<LoaderPage />} />

      {/* <Route path="/contact" element={<ContactPage />} /> */}
      {/* <Route path="/services" element={<ServicesPage />} /> */}


      {/* ProtectedRoute   */}
      <Route path="/admindashboard" element={<TherapistProtectedRoute ><AdminDashoboard /></TherapistProtectedRoute>} />
      < Route path="/servicespage" element={< UserProtectedRoute > <ServicesPage /></UserProtectedRoute >} />
      < Route path="/cartpage" element={< CartPage />} />
      < Route path="/therapistdashboard" element={<TherapistProtectedRoute >< TherapistDashboard /></TherapistProtectedRoute>} />
      < Route path="/choosetherapist" element={< ChooseTherapistPage />} />
      < Route path="/paymentpage" element={< PaymentPage />} />


    </Routes >
  );
};

export default AppRoutes;
