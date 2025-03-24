import React, { useEffect, useState } from 'react'; // Import necessary React hooks
import { fetchPopularMovies, fetchBollywoodMovies, searchMovies } from '../api'; // Import API functions
import MovieCard from './MovieCard'; // Import the MovieCard component
import SearchBar from '../components/SearchBar'; // Import the SearchBar component
import Pagination from '../components/Pagination'; // Import the Pagination component
import './MovieCard.css'; // Import CSS for styling

const HomePage = () => {
  // State to hold popular movies, Bollywood movies, search results, and pagination info
  const [popularMovies, setPopularMovies] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect to fetch movies when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      const popularData = await fetchPopularMovies(); // Fetch popular movies
      const bollywoodData = await fetchBollywoodMovies(); // Fetch Bollywood movies
      setPopularMovies(popularData); // Set popular movies state
      setBollywoodMovies(bollywoodData); // Set Bollywood movies state
    };
    getMovies(); // Call the function to fetch movies
  }, []);

  // Function to handle search input
  const handleSearch = async (query) => {
    setSearchQuery(query); // Update search query state
    if (query) {
      const results = await searchMovies(query, currentPage); // Fetch search results
      setSearchResults(results.results); // Set search results state
      setTotalPages(results.total_pages); // Set total pages for pagination
      setIsSearching(true); // Set searching state to true
    } else {
      setIsSearching(false); // Reset searching state if query is empty
    }
  };

  // Function to handle page changes in pagination
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
    if (isSearching) {
      handleSearch(searchQuery, page); // Fetch search results for the new page
    }
  };

  // Determine which movies to display based on search state
  const moviesToDisplay = isSearching ? searchResults : popularMovies;

  return (
    <div className="container mt-4">
      <SearchBar onSearch={handleSearch} /> {/* Render the search bar */}
      <h1>{isSearching ? 'Search Results' : 'Popular Movies'}</h1>
      <div className="row">
        {moviesToDisplay.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <MovieCard movie={movie} showAddButton={true} showRemarksInput={false} /> {/* Render MovieCard */}
          </div>
        ))}
      </div>
      {isSearching && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange} // Pass page change handler
        />
      )}
      <h1 className="mt-5">Bollywood Movies</h1>
      <div className="row">
        {bollywoodMovies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <MovieCard movie={movie} showAddButton={true} showRemarksInput={false} /> {/* Render MovieCard */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage; // Export the HomePage component
