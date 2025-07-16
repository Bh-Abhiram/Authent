import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ShowQR from './Pages/ShowQR';
import ProtectedRoute from './Pages/ProtectedRoute'; // adjust path as needed
import Dashboard from './Pages/Dashboard';
import Learn from './Pages/Learn';
import News from './Pages/News';
import About from './Pages/About';
import Contact from './Pages/Contact';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/show-qr" element={<ShowQR />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute> <Learn /> </ProtectedRoute>} />
        <Route path="/news" element={<ProtectedRoute> <News /> </ProtectedRoute>} />
        <Route path="about" element={<ProtectedRoute> <About /> </ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute> <Contact /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
