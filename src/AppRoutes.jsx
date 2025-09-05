import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import CareerPage from "./pages/CareerPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/About.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
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
import FindTherapistByAvailability from "./components/FindTherapistByAvailability.jsx";

// Protected routes
import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import TherapistProtectedRoute from "./components/TherapistProtectedRoute.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

// Therapist layout + pages
import TherapistLayout from "./layouts/TherapistLayout.jsx";
import TherapistDashboard from "./pages/TherapistDashobard.jsx";
import TherapistSchedule from "./layouts/TherapistSchedule.jsx";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./components/therapistSchedule/forgotPassword/forgotPassword.jsx";
import ResetPasswordPage from "./components/therapistSchedule/forgotPassword/ResetPasswordPage.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AllServicesPage from "./pages/AllServicesPage.jsx";
import BrowseTherapists from "./components/browseTherapist/BrowseTherapist.jsx";
import FeaturedTherapists from "./components/FeaturedTherapist.jsx";
import ServiceByTherapist from "./components/byTherapistFlow/ServicesByTherapist.jsx";
import TherapistManagement from "./components/Admin/TherapistManagement.jsx";
import AddNewTherapist from "./components/Admin/AddNewTherapist.jsx";
import TherapistProfile from "./components/TherspistProfile/TherapistProfileTherapist.jsx";
import CreateNewService from "./components/createNewService.jsx";
import ServiceManagement from "./components/serviceManagement/ServiceManagement.jsx";
import UserProfile from "./components/user/UserProfile.jsx";
import EditTherapistProfile from "./components/therapist/EditTherapistProfile.jsx";
import TherapistProfileTherapist from "./components/TherspistProfile/TherapistProfileTherapist.jsx";

const AppRoutes = () => {
  return (
    <>
      <Toaster
        position="top-center"
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
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/otpinput/:purpose" element={<OtpInput />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/loading" element={<LoaderPage />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfail" element={<PaymentFail />} />
        <Route path="/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth/resetpassword/:token" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/servicesbytherapist"
          element={
            <ServiceByTherapist />
          }
        />

        {/* Protected User Routes */}
        {/* <Route */}
        {/*   path="/servicespage" */}
        {/*   element={ */}
        {/*     <UserProtectedRoute> */}
        {/*       <ServicesPage /> */}
        {/*     </UserProtectedRoute> */}
        {/*   } */}
        {/* /> */}
        <Route
          path="/findtherapistbyavailability"
          element={
            <UserProtectedRoute>
              <FindTherapistByAvailability />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/user/userprofile"
          element={
            <UserProtectedRoute>
              <UserProfile />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/browsetherapists"
          element={
            <UserProtectedRoute>
              <BrowseTherapists />
            </UserProtectedRoute>
          }
        />
        <Route path="/allservicespage" element={<AllServicesPage />} />
        <Route
          path="/cartpage"
          element={
            <UserProtectedRoute>
              <CartPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/choosetherapist"
          element={
            <UserProtectedRoute>
              <ChooseTherapistPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/paymentpage"
          element={
            <UserProtectedRoute>
              <PaymentPage />
            </UserProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="admindashboard" replace />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="therapistmanagement" element={<TherapistManagement />} />
          <Route path="addnewtherapist" element={<AddNewTherapist />} />
          <Route path="createnewservice" element={<CreateNewService />} />
          <Route path="servicemanagement" element={<ServiceManagement />} />
          <Route path="edittherapistprofileadmin" element={<EditTherapistProfile />} />


        </Route>

        {/* Therapist Protected Routes */}
        <Route
          path="/therapist"
          element={
            <TherapistProtectedRoute>
              <TherapistLayout />
            </TherapistProtectedRoute>
          }
        >
          <Route index element={<Navigate to="therapistdashboard" replace />} />
          <Route path="therapistdashboard" element={<TherapistDashboard />} />
          <Route path="therapistprofile/:id" element={<TherapistProfile />} />
          <Route path="therapistprofiletherapist" element={<TherapistProfileTherapist />} />
          <Route path="edittherapistprofile/" element={<EditTherapistProfile />} />
          <Route
            path="therapistschedule"
            element={
              <TherapistProtectedRoute>
                <TherapistSchedule />
              </TherapistProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
