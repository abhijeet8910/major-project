
//used to display in phone
// import React from 'react'
// import BuySection from './usersection/BuySection'
// const App = () => {
//   return (
//     <div>
//       <BuySection/>
//     </div>
//   )
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserHomePage from './pages/UserHomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerHomePage from './pages/SellerHomePage';
import NavbarBeforeLogin from './components/NavbarBeforeLogin';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import SellerRegister from './pages/SellerRegister';
import SellerLogin from './pages/SellerLogin';
import SellerDashboard from './SellerSection/SellerDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken); // Convert token to boolean
  }, []);

  const handleAuthChange = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      {/* Dynamically render the navbar based on authentication */}
      {isAuthenticated ? (
        <NavbarAfterLogin onLogout={() => handleAuthChange(false)} />
      ) : (
        <NavbarBeforeLogin onLogin={() => handleAuthChange(true)} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login onLogin={() => handleAuthChange(true)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/userhomepage/*" element={<UserHomePage />} />
        
        <Route path="/sell" element={<SellerHomePage />} />
        <Route path='/sellerregister' element={<SellerRegister/>}/>
        <Route path='/sellerlogin' element={<SellerLogin/>}/>
        <Route path='/sellerdashboard' element={<SellerDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
