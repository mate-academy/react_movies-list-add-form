import React, { useState, useEffect } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';
import { NewMovie } from './components/NewMovie';

interface Movie {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>(moviesFromServer);
  const [visibleMovies, setVisibleMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    setVisibleMovies(filterMovies(movies, query));
  }, [query, movies]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const filterMovies = (movies: Movie[], query: string) => {
    if (!query) {
      return movies;
    }

    const normalizedQuery = query.toLowerCase().trim();

    return movies.filter(
      movie =>
        movie.title.toLowerCase().includes(normalizedQuery) ||
        movie.description?.toLowerCase().includes(normalizedQuery),
    );
  };

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prevMovies => [...prevMovies, newMovie]);
  };

  return (
    <div className="page">
      <div className="page-content">
        <div className="box">
          <div className="field">
            <label htmlFor="search-query" className="label">
              Search movie
            </label>

            <div className="control">
              <input
                type="text"
                id="search-query"
                className="input"
                placeholder="Type search word"
                value={query}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>

        <MoviesList movies={visibleMovies} />
      </div>

      <div className="sidebar">
        <NewMovie onAddMovie={handleAddMovie} />
      </div>
    </div>
  );
};
