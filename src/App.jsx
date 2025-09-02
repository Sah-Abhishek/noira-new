import React from 'react';

import AppRoutes from './AppRoutes';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';


function AppLayout() {
  const location = useLocation();

  // Add all paths where navbar should be hidden
  const hideNavbarPaths = [
    '/adminlogin',
    '/otpinput',
    '/usersignup',
    '/userlogin',
    '/therapist/therapistdashboard',
    '/therapist/dashboard',
    '/therapist/therapistschedule',
    '/auth/forgotpassword',
    '/auth/resetpassword/:token',
    '/admin/admindashboard',
    '/admin/therapistmanagement',
    '/paymentsuccess',
    '/paymentfail',
    '/admin/addnewtherapist'
  ];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
