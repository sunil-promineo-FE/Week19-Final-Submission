import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { addToFavorites, removeFromFavorites, updateMovieRemarks } from '../api'; // Import API functions

const MovieCard = ({ movie, showAddButton, onRemove, showRemarksInput }) => {
  const navigate = useNavigate(); // Initialize navigation
  const [remarks, setRemarks] = useState(movie.remarks || ''); // Initialize remarks state

  // Function to navigate to the movie details page
  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`); // Navigate to the details page using movie ID
  };

  // Function to add the movie to favorites
  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(movie); // Call API to add movie to favorites
      alert(`${movie.title} added to favorites!`); // Alert user
    } catch (error) {
      console.error('Error adding to favorites:', error); // Log error
      alert('Failed to add to favorites. Please try again.'); // Alert user
    }
  };

  // Function to remove the movie from favorites
  const handleRemoveFromFavorites = async () => {
    try {
      await removeFromFavorites(movie.id); // Call API to remove movie from favorites
      onRemove(movie.id); // Notify parent component to update the state
      alert(`${movie.title} removed from favorites!`); // Alert user
    } catch (error) {
      console.error('Error removing from favorites:', error); // Log error
      alert('Failed to remove from favorites. Please try again.'); // Alert user
    }
  };

  // Function to update the remarks for the movie
  const handleUpdateRemarks = async () => {
    try {
      await updateMovieRemarks(movie.id, remarks); // Call API to update remarks
      alert('Remarks updated successfully!'); // Alert user
    } catch (error) {
      console.error('Error updating remarks:', error); // Log error
      alert('Failed to update remarks. Please try again.'); // Alert user
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Display movie poster
        alt={movie.title}
        onClick={handleViewDetails} // Navigate to details on click
        style={{ cursor: 'pointer' }}
      />
      <h3>{movie.title}</h3>
      {showAddButton ? ( // Conditional rendering for add/remove button
        <button onClick={handleAddToFavorites} className="btn btn-primary">
          Add to Favorites
        </button>
      ) : (
        <button onClick={handleRemoveFromFavorites} className="btn btn-danger">
          Remove from Favorites
        </button>
      )}
      
      {/* Remarks input field only if showRemarksInput is true */}
      {showRemarksInput && (
        <div>
          <textarea
            value={remarks} // Bind remarks state to textarea
            onChange={(e) => setRemarks(e.target.value)} // Update state on change
            placeholder="Add your remarks here..."
          />
          <button onClick={handleUpdateRemarks} className="btn btn-secondary">
            Save Remarks
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard; // Export the MovieCard component
