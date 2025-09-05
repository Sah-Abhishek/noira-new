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
    '/admin/addnewtherapist',
    '/admin/therapistprofile/:id',
    '/therapist/therapistprofile/:id',
    '/admin/createnewservice',
    '/admin/servicemanagement',
    '/admin/edittherapistprofile/:id',
    '/therapist/edittherapistprofile/:id'
  ];

  const shouldHideNavbar = hideNavbarPaths.some((path) => {
    // Handle dynamic route with ":id"
    if (path.includes(':id')) {
      const basePath = path.split('/:')[0]; // remove the :id part
      return location.pathname.startsWith(basePath);
    }

    return location.pathname === path;
  });

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
