"use client";
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=a2b07930&s=${searchTerm}`);
    setMovies(response.data.Search || []);
  };

  return (
    <div>
      <h1>Поиск фильмов</h1>
      <input
        type="text"
        placeholder="Saw"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>

      <div>
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <h2>{movie.Title}</h2>
            <p>Год: {movie.Year}</p>
            <img src={movie.Poster} alt={movie.Title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;