import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p className="mb-0">
        © 2023 Movie Database Explorer. Powered by{' '}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white"
        >
          TMDb API
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;