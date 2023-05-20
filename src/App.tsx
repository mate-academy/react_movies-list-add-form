import './App.scss';
import { useEffect, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { IsMovie } from './types/Movie';
import moviesFromServer from './api/movies.json';

function areObjectPropertiesOnlySpaces(obj: {
  [key: string]: string }): boolean {
  return Object.keys(obj).some((key) => obj[key].trim().length === 0
   && key !== 'description');
}

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [touchedMovies, setTouchedMovies] = useState<IsMovie>(
    {
      title: false,
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
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const onlySpaces = areObjectPropertiesOnlySpaces(newMovie);

  const addOn = () => {
    if (onlySpaces) {
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
    } else if (!onlySpaces) {
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
    if (!onlySpaces) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }

    if (touchedMovies.title
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
