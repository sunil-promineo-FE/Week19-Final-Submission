import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const FavoritesList = ({ favorites, removeFromFavorites, updateFavoriteNote }) => {
  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        favorites.map((movie) => (
          <Card key={movie.id} className="mb-3">
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Form.Group>
                <Form.Label>Add a Note</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Add a note"
                  value={movie.note || ''}
                  onChange={(e) => updateFavoriteNote(movie.id, e.target.value)}
                />
              </Form.Group>
              <Button variant="danger" onClick={() => removeFromFavorites(movie.id)}>
                Remove
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default FavoritesList;