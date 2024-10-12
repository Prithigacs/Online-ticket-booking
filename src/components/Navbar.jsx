// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHome, FaTicketAlt, FaUserPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const NavigationBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Remove user from local storage
    window.location.reload(); // Refresh the page to reflect the change
  };

  const isLoggedIn = !!localStorage.getItem("currentUser"); // Check if user is logged in

  return (
    <Navbar style={{ backgroundColor: "black" }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="mx-3">
          Online Ticket Booking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/book-tickets" className="mx-2">
              <FaTicketAlt /> Book Tickets
            </Nav.Link>
            <Nav.Link as={Link} to="/my-bookings" className="mx-2">
              <FaTicketAlt /> My Bookings
            </Nav.Link>
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/registration" className="mx-2">
                  <FaUserPlus /> Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="mx-2">
                  <FaSignInAlt /> Login
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout} className="mx-2">
                <FaSignOutAlt /> Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
