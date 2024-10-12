
import React, { useEffect, useState } from "react";
import { Button, Container, Table, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TicketSummary = () => {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      navigate("/login");
    }

    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const userBookings = existingBookings.filter((booking) => booking.username === currentUser);
    setBookings(userBookings);
  }, [navigate]);

  const handleCancelBooking = (seat, movie) => {
    const updatedBookings = bookings.filter((booking) => !(booking.seat === seat && booking.movie === movie));
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setMessage("Booking canceled successfully.");
  };

  return (
    <Container className="mt-5 p-4">
      <h2>My Bookings</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Seat</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="3">No bookings found.</td>
            </tr>
          ) : (
            bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.movie}</td>
                <td>{booking.seat}</td>
                <td>
                  <Button variant="danger" onClick={() => handleCancelBooking(booking.seat, booking.movie)}>
                    Cancel
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TicketSummary;
