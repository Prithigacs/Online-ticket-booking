
import React from "react";
import { Container } from "react-bootstrap";
import './Home.css'; 

const Home = () => {
  return (
    <Container fluid className="home-container text-center">
      <h1>Welcome to the Online Ticket Booking System</h1>
      <p>Please register or login to book your tickets.</p>
    </Container>
  );
};

export default Home;
