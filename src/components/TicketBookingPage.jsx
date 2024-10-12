import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import moviesData from "./moviesData"; 

const TicketBookingPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("Loading movies data from localStorage...");

    // Clear localStorage for moviesData to ensure fresh initialization (optional, for testing)
    localStorage.removeItem("moviesData"); // You can remove this after testing

    let storedMovies = JSON.parse(localStorage.getItem("moviesData"));

    // If no movies are found in localStorage, initialize with the default moviesData
    if (!storedMovies || storedMovies.length === 0) {
      console.log("No movies found in localStorage, initializing with default data...");
      localStorage.setItem("moviesData", JSON.stringify(moviesData)); // Store default moviesData
      storedMovies = moviesData; // Set it in localStorage for future use
    } else {
      console.log("Movies found in localStorage:", storedMovies);
    }

    setMovies(storedMovies); // Set movies state

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(storedUser || null); // Set currentUser state

  }, []);

  // Function to handle ticket booking
  const handleBookTicket = (movie, seat) => {
    if (!currentUser) {
      alert("Please log in to book tickets.");
      return;
    }

    const booking = {
      movie: movie.name,
      seat: seat,
      user: currentUser.username,
    };

    // Save booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]));

    // Update available seats for the movie by removing the booked seat
    const updatedMovies = movies.map((m) => {
      if (m.name === movie.name) {
        return {
          ...m,
          availableSeats: m.availableSeats.filter((s) => s !== seat),
        };
      }
      return m;
    });

    // Save updated movies to localStorage and update state
    localStorage.setItem("moviesData", JSON.stringify(updatedMovies));
    setMovies(updatedMovies);

    alert(`Successfully booked seat ${seat} for ${movie.name}`);
  };

  console.log("Movies in State:", movies);

  return (
    <Container className="mt-5">
      <h2>Book Tickets</h2>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Card key={movie.id} className="mb-3">
            <Card.Body>
              <Card.Title>{movie.name}</Card.Title>
              <Card.Text>{movie.description}</Card.Text>
              <Card.Text><strong>Timing:</strong> {movie.timing}</Card.Text>
              <div>
                <h5>Available Seats</h5>
                {movie.availableSeats.length > 0 ? (
                  movie.availableSeats.map((seat) => (
                    <Button
                      key={seat}
                      variant="primary"
                      onClick={() => handleBookTicket(movie, seat)}
                      className="m-1"
                    >
                      {seat}
                    </Button>
                  ))
                ) : (
                  <p>No seats available</p>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No movies available</p>
      )}
    </Container>
  );
};

export default TicketBookingPage;
