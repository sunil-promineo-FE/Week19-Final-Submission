import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { fetchFavorites } from '../api'; // Import the API function to fetch favorites
import MovieCard from './MovieCard'; // Import the MovieCard component

const FavoritesPage = () => {
  // State to hold the list of favorite movies
  const [favorites, setFavorites] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // State to manage error messages
  const [error, setError] = useState(null);

  // Function to update the note for a specific favorite movie
  const updateFavoriteNote = async (movieId, note) => {
    try {
      // Call the API to update the movie's remarks
      await updateMovieRemarks(movieId, note);
      // Update the local state to reflect the new note
      setFavorites((prevFavorites) =>
        prevFavorites.map((movie) =>
          movie.id === movieId ? { ...movie, note } : movie // Update the specific movie's note
        )
      );
    } catch (error) {
      console.error('Failed to update favorite note:', error); // Log any errors
    }
  };

  // useEffect hook to fetch favorites when the component mounts
  useEffect(() => {
    const getFavorites = async () => {
      try {
        console.log('Starting favorites fetch...'); // Log the start of the fetch
        const data = await fetchFavorites(); // Fetch the favorites from the API
        console.log('Favorites data received:', data); // Log the received data
        setFavorites(data); // Set the favorites state with the fetched data
      } catch (err) {
        console.error('Favorites fetch error:', err); // Log any errors during fetch
        setError(err.message); // Set the error state with the error message
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };
    getFavorites(); // Call the function to fetch favorites
  }, []); // Empty dependency array means this runs once when the component mounts

  // Function to handle removing a movie from favorites
  const handleRemove = (movieId) => {
    console.log(`Removing movie with ID: ${movieId} from state`); // Log the removal action
    setFavorites((prevFavorites) => prevFavorites.filter((movie) => movie.id !== movieId)); // Update state to remove the movie
  };

  // Conditional rendering based on loading and error states
  if (loading) return <div className="container mt-4">Loading favorites...</div>; // Show loading message
  if (error) return <div className="container mt-4 text-danger">Error: {error}</div>; // Show error message

  return (
    <div className="container mt-4">
      <h1>Favorites</h1>
      <div className="row">
        {favorites.length > 0 ? ( // Check if there are any favorites
          favorites.map((movie) => ( // Map through the favorites array
            <div key={movie.id} className="col-md-4 col-lg-3 mb-4"> {/* Use movie ID as key */}
              <MovieCard
                movie={movie} // Pass the movie object to MovieCard
                showAddButton={false} // Disable the add button since it's already a favorite
                onRemove={handleRemove} // Pass the remove handler
                showRemarksInput={true} // Enable remarks input for favorites
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-muted">No favorites added yet.</p> {/* Message when no favorites are present */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage; // Export the component for use in other parts of the application
