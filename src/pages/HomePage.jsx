import React, { useEffect, useState } from 'react';
import { fetchPopularMovies, fetchBollywoodMovies, searchMovies } from '../api';
import MovieCard from './MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import './MovieCard.css';

const HomePage = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      const popularData = await fetchPopularMovies();
      const bollywoodData = await fetchBollywoodMovies();
      setPopularMovies(popularData);
      setBollywoodMovies(bollywoodData);
    };
    getMovies();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      const results = await searchMovies(query, currentPage);
      setSearchResults(results.results);
      setTotalPages(results.total_pages);
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (isSearching) {
      handleSearch(searchQuery, page);
    }
  };

  const moviesToDisplay = isSearching ? searchResults : popularMovies;

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} />
      <h1>{isSearching ? 'Search Results' : 'Popular Movies'}</h1>
      <div className="row">
        {moviesToDisplay.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <MovieCard movie={movie} showAddButton={true} showRemarksInput={false} />
          </div>
        ))}
      </div>
      {isSearching && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <h1 className="mt-5">Bollywood Movies</h1>
      <div className="row">
        {bollywoodMovies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <MovieCard movie={movie} showAddButton={true} showRemarksInput={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
