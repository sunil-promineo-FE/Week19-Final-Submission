import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import { fetchMovieDetails } from '../api'; // Import API function to fetch movie details

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [movie, setMovie] = useState(null); // State to hold the movie details

  // useEffect to fetch movie details when the component mounts
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id); // Fetch movie details using the ID
        setMovie(data); // Set the movie state with the fetched data
      } catch (error) {
        console.error('Error fetching movie details:', error); // Log any errors
      }
    };

    getMovieDetails(); // Call the function to fetch movie details
  }, [id]); // Dependency array includes id to refetch if it changes

  // If movie data is not yet available, show a loading message
  if (!movie) return <div>Loading...</div>;

  // Render the movie details once the data is available
  return (
    <div className="container mt-4">
      <h1>{movie.title}</h1> {/* Display the movie title */}
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Display the movie poster
        alt={movie.title} // Alt text for the image
      />
      <p>{movie.overview}</p> {/* Display the movie overview */}
      <p>Release Date: {movie.release_date}</p> {/* Display the release date */}
    </div>
  );
};

export default MovieDetailsPage; // Export the MovieDetailsPage component
