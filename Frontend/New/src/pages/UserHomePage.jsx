import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
 
import BuySection from '../usersection/BuySection'; 
 
import Footer from '../usercomponents/Footer'; 
import Apihomepage from '../usersection/Apihomepage';
import UserDashboard from '../Dashboards/UserDashboard';
import ExploreSection from '../usersection/ExploreSection';
import UserOrders from '../Dashboards/UserDashboards.jsx/UserOrders';

const UserHomePage = () => {
  return (
    <div className='min-h-screen relative pb-20'>
      

    
      <Routes>
        <Route path="/" element={<Apihomepage/>} />
        <Route path="search" element={<ExploreSection />} />
        <Route path="buy" element={<BuySection />} />
        <Route path="user" element={<UserDashboard/>} />
        <Route path= "orders" element = {<UserOrders/>}/>
      </Routes>

      <Footer />
    </div>
  );
};

export default UserHomePage;
