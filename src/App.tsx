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
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const addOn = () => {
    if (!title.length
      && !description.length
      && !imgUrl.length
      && !imdbUrl.length
      && !imdbId.length) {
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
    }
  };

  const valueDelete = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  useEffect(() => {
    if (title.length
      && description.length
      && imgUrl.length
      && imdbUrl.length
      && imdbId.length) {
      setIsButtonDisabled(false);
    }

    if (touchedMovies.title
      && touchedMovies.description
      && touchedMovies.imgUrl
      && touchedMovies.imdbId
      && touchedMovies.imdbUrl) {
      setIsButtonDisabled(true);
    }
  }, [title,
    imgUrl,
    imdbUrl,
    imdbId,
    touchedMovies.title,
    touchedMovies.description,
    touchedMovies.imgUrl,
    touchedMovies.imdbId,
    touchedMovies.imdbUrl]);

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
          valueDelete={valueDelete}
        />
      </div>
    </div>
  );
};
