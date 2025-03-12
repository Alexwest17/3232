// src/MovieSearch.js
import React, { useState } from 'react';
import axios from 'axios';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const API_KEY = 'a2b07930'; // Замените на ваш API-ключ

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        if (!query) return;

        try {
            const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
            } else {
                setMovies([]);
                setError(response.data.Error);
            }
        } catch (err) {
            setError('Ошибка при подключении к API.');
        }
    };

    return (
        <div>
            <h1>Поиск фильмов</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Saw"
                />
                <button type="submit">Поиск</button>
            </form>
            {error && <p>{error}</p>}
            <div>
                {movies && movies.length > 0 ? (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.imdbID}>
                                <h2>{movie.Title} ({movie.Year})</h2>
                                <img src={movie.Poster} alt={movie.Title} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Фильмы не найдены.</p>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;