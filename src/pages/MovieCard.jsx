import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToFavorites, removeFromFavorites, updateMovieRemarks } from '../api';

const MovieCard = ({ movie, showAddButton, onRemove, showRemarksInput }) => {
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState(movie.remarks || '');

  const handleViewDetails = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleAddToFavorites = async () => {
    try {
      await addToFavorites(movie);
      alert(`${movie.title} added to favorites!`);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add to favorites. Please try again.');
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await removeFromFavorites(movie.id);
      onRemove(movie.id);
      alert(`${movie.title} removed from favorites!`);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      alert('Failed to remove from favorites. Please try again.');
    }
  };

  const handleUpdateRemarks = async () => {
    try {
      await updateMovieRemarks(movie.id, remarks); // Update the remarks
      alert('Remarks updated successfully!');
    } catch (error) {
      console.error('Error updating remarks:', error);
      alert('Failed to update remarks. Please try again.');
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        onClick={handleViewDetails}
        style={{ cursor: 'pointer' }}
      />
      <h3>{movie.title}</h3>
      {showAddButton ? (
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
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
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

export default MovieCard;
