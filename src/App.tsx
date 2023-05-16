import './App.scss';
import { useEffect, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { IsMovie } from './types/Movie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [touchedMovies, setTouchedMovies] = useState<IsMovie>(
    {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  );
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const addOn = () => {
    setMovies([...movies, newMovie]);

    if (newMovie.title.length === 0
      && newMovie.description.length === 0
      && newMovie.imgUrl.length === 0
      && newMovie.imdbUrl.length === 0
      && newMovie.imdbId.length === 0) {
      setIsButtonDisabled(true);

      const updatedObjectImdbId = {
        ...newMovie,
        title: true,
        description: true,
        imdbId: true,
        imgUrl: true,
        imdbUrl: true,
      };

      setTouchedMovies(updatedObjectImdbId);
    } else {
      setMovies([...movies, newMovie]);
      newMovie.title = '';
      newMovie.description = '';
      newMovie.imgUrl = '';
      newMovie.imdbUrl = '';
      newMovie.imdbId = '';
    }
  };

  useEffect(() => {
    if (newMovie.title.length !== 0
      && newMovie.description.length !== 0
      && newMovie.imgUrl.length !== 0
      && newMovie.imdbUrl.length !== 0
      && newMovie.imdbId.length !== 0) {
      setIsButtonDisabled(false);
    }
  }, [newMovie.title,
    newMovie.imgUrl,
    newMovie.imdbUrl,
    newMovie.imdbId]);

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          newMovie={newMovie}
          setNewMovie={setNewMovie}
          isButtonDisabled={isButtonDisabled}
          touchedMovies={touchedMovies}
          setTouchedMovies={setTouchedMovies}
          addOn={addOn}
        />
      </div>
    </div>
  );
};
