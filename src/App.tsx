import './App.scss';
import { useEffect, useState, useMemo } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import { RequiredMovieFields } from './types/Movie';
import moviesFromServer from './api/movies.json';

function checkEmptyInputs(obj: {
  [key: string]: string }): boolean {
  return Object.keys(obj).some((key) => !obj[key].trim().length
   && key !== 'description');
}

export const App = () => {
  const [movies, setMovies] = useState(moviesFromServer);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [touchedMovies, setTouchedMovies] = useState<RequiredMovieFields>({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });
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

  const hasEmptyRequiredFields = useMemo(() => {
    return checkEmptyInputs(newMovie);
  }, [newMovie]);

  const handleMovieAdd = () => {
    return hasEmptyRequiredFields
      ? setIsButtonDisabled(true)
      : setMovies([...movies, newMovie]);
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
    if (touchedMovies.title
      && touchedMovies.imgUrl
      && touchedMovies.imdbId
      && touchedMovies.imdbUrl) {
      setIsButtonDisabled(true);
    }
  }, [touchedMovies.title,
    touchedMovies.imgUrl,
    touchedMovies.imdbId,
    touchedMovies.imdbUrl]);

  useEffect(() => {
    if (!hasEmptyRequiredFields) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [title,
    imgUrl,
    imdbUrl,
    imdbId]);

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
          handleMovieAdd={handleMovieAdd}
          valueDelete={valueDelete}
        />
      </div>
    </div>
  );
};
