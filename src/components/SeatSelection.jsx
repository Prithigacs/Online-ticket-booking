
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const SeatSelection = ({ selectedSeats, onSeatSelect }) => {
  const totalSeats = 10; 
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Load the booked seats from localStorage
    const booked = JSON.parse(localStorage.getItem("bookedSeats")) || [];
    setBookedSeats(booked);
  }, []);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      alert("This seat is already booked!");
      return;
    }
    onSeatSelect(seatNumber);
  };

  return (
    <Container className="mt-3">
      <h3>Select Your Seats</h3>
      <div className="seat-grid">
        {Array.from({ length: totalSeats }, (_, index) => {
          const seatNumber = index + 1;
          const isBooked = bookedSeats.includes(seatNumber);
          const isSelected = selectedSeats.includes(seatNumber);

          return (
            <Button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              variant={isBooked ? "danger" : isSelected ? "success" : "outline-primary"}
              className="m-1"
              disabled={isBooked} // Disable button if seat is booked
            >
              Seat {seatNumber}
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

export default SeatSelection;
