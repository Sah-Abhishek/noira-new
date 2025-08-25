import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import CareerPage from "./pages/CareerPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/About.jsx";
import AdmiLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import OtpInput from "./pages/OtpInput.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import UserLogin from "./pages/UserLogin.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import ChooseTherapistPage from "./pages/ChooseTherapistPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import LoaderPage from "./pages/LoaderPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFail from "./pages/PaymentFail.jsx";

// Protected routes
import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import TherapistProtectedRoute from "./components/TherapistProtectedRoute.jsx";

// Therapist layout + pages
import TherapistLayout from "./layouts/TherapistLayout.jsx";
import TherapistDashboard from "./pages/TherapistDashobard.jsx";
import TherapistSchedule from "./layouts/TherapistSchedule.jsx";
import { Toaster } from "react-hot-toast";
// import TherapistProfile from "./pages/TherapistProfile.jsx";
// import TherapistAppointments from "./pages/TherapistAppointments.jsx";
// import TherapistSettings from "./pages/TherapistSettings.jsx";

const AppRoutes = () => {
  return (
    <>
      <Toaster
        position="top-center" // 👈 where the toast will show
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/adminlogin" element={<AdmiLogin />} />
        <Route path="/otpinput/:purpose" element={<OtpInput />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/loading" element={<LoaderPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Protected User Routes */}
        <Route
          path="/servicespage"
          element={
            <UserProtectedRoute>
              <ServicesPage />
            </UserProtectedRoute>
          }
        />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/choosetherapist" element={<ChooseTherapistPage />} />
        <Route path="/paymentpage" element={<PaymentPage />} />

        {/* Admin Protected Route */}
        <Route
          path="/admindashboard"
          element={
            <TherapistProtectedRoute>
              <AdminDashboard />
            </TherapistProtectedRoute>
          }
        />

        {/* Therapist Nested Routes */}
        <Route
          path="/therapist"
          element={
            <TherapistProtectedRoute>
              <TherapistLayout />
            </TherapistProtectedRoute>
          }
        >
          {/* Redirect /therapist → /therapist/dashboard */}
          <Route index element={<Navigate to="therapistdashboard" replace />} />

          <Route path="therapistdashboard" element={<TherapistDashboard />} />
          {/* <Route path="profile" element={<TherapistProfile />} /> */}
          {/* <Route path="appointments" element={<TherapistAppointments />} /> */}
          {/* <Route path="settings" element={<TherapistSettings />} /> */}
          <Route path="therapistschedule" element={<TherapistSchedule />} />
        </Route>
      </Routes >
    </>

  );
};

export default AppRoutes;
