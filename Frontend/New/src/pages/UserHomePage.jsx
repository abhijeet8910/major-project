import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SearchSection from '../usersection/SearchSection'; 
import BuySection from '../usersection/BuySection'; 
import UserSection from '../usersection/UserSection'; 
import Footer from '../usercomponents/Footer'; 
import Apihomepage from '../usersection/Apihomepage';
const UserHomePage = () => {
  return (
    <div>
      

    
      <Routes>
        <Route path="/" element={<Apihomepage/>} />
        <Route path="search" element={<SearchSection />} />
        <Route path="buy" element={<BuySection />} />
        <Route path="user" element={<UserSection />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default UserHomePage;
