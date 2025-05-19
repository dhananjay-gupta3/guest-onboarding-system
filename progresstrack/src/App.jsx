import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import HotelForm from '../components/HotelForm';
import AdminPanel from '../components/AdminPanel';
import HotelLandingPage from '../components/HotelLandingPage';
import GuestAdminPanel from '../components/GuestAdminPanel';
import AdminLogin from '../components/AdminLogin';
import Navbar from '../components/Navbar';
import GuestAdminLogin from './GuestAdminLogin';
import Contact from '../components/Contact';
import About from '../components/About';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/guest-admin-login" element={<GuestAdminLogin />} />
        <Route path="/hotel/:id" element={<HotelForm />} />
        <Route path="/hotels/:id" element={<HotelLandingPage />} />
        <Route path="/guest-admin/:hotelId" element={<GuestAdminPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </div>

  );
};

export default App;
