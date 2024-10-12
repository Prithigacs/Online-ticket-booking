
import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancelBooking = (seat, movie) => {
    // Update the bookings by removing the canceled booking
    const updatedBookings = bookings.filter(
      (booking) => !(booking.seat === seat && booking.movie === movie)
    );
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Update available seats by adding the canceled seat back to the movie
    const moviesData = JSON.parse(localStorage.getItem("moviesData")) || [];
    const updatedMoviesData = moviesData.map((m) => {
      if (m.name === movie) {
        return {
          ...m,
          availableSeats: [...m.availableSeats, seat], // Re-add canceled seat
        };
      }
      return m;
    });

    localStorage.setItem("moviesData", JSON.stringify(updatedMoviesData));
    setBookings(updatedBookings); // Update the state to reflect the canceled booking
  };

  return (
    <Container className="mt-5">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Seat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.movie}</td>
                <td>{booking.seat}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleCancelBooking(booking.seat, booking.movie)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;
