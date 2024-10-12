
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import TicketBookingPage from "./components/TicketBookingPage";
import MyBookings from "./components/MyBookings";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import TicketSummary from "./components/TicketSummary";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-tickets" element={
          <ProtectedRoute>
            <TicketBookingPage />
          </ProtectedRoute>
        } />
        <Route path="/my-bookings" element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ticket-summary" element={<TicketSummary />} />
      </Routes>
    </Router>
  );
};

export default App;
