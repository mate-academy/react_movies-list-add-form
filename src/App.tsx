import React, { useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

interface Movie {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

interface FormValidation {
  title: boolean,
  description: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
}

export const App: React.FC = () => {
  const movie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const validForm: FormValidation = {
    title: true,
    description: false,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  };

  const [newMovie, setNewMovie] = useState(movie);
  const [
    moviesCollection,
    setMovieCollection,
  ] = useState<Movie[]>([...moviesFromServer]);
  const [checkForm, setFromChecks] = useState(validForm);
  const [checkUrl, setUrlErrorMsg] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (!value && name !== 'description') {
      setFromChecks(currentCheck => (
        {
          ...currentCheck,
          [name]: false,
        }
      ));

      setNewMovie((current) => (
        {
          ...current,
          [name]: value,
        }));

      return;
    }
    // eslint-disable-next-line
    const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case 'description': {
        setNewMovie((current) => (
          {
            ...current,
            [name]: value,
          }
        ));

        setFromChecks(currentCheck => (
          {
            ...currentCheck,
            [name]: false,
          }
        ));

        break;
      }

      case 'title':
      case 'imdbId': {
        setNewMovie((current) => (
          {
            ...current,
            [name]: value,
          }

        ));

        setFromChecks(currentCheck => (
          {
            ...currentCheck,
            [name]: true,
          }
        ));

        break;
      }

      case 'imdbUrl':
      case 'imgUrl': {
        const url = value.match(regexp);

        if (url) {
          setNewMovie((current) => (
            {
              ...current,
              [name]: value,
            }
          ));

          setFromChecks(currentCheck => (
            {
              ...currentCheck,
              [name]: url?.length > 0,
            }
          ));

          return;
        }

        setNewMovie((current) => (
          {
            ...current,
            [name]: value,
          }
        ));

        setFromChecks(currentCheck => (
          {
            ...currentCheck,
            [name]: false,
          }
        ));

        setUrlErrorMsg('Incorrect link. Please, enter propper URL');
        break;
      }

      default:
        break;
    }
  };

  const addFilm = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    const copy = { ...newMovie };

    setMovieCollection((currentMovies) => {
      return (
        [...currentMovies, copy]
      );
    });

    setNewMovie(movie);
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={moviesCollection} />
      </div>
      <div className="sidebar">
        <NewMovie
          handleChange={handleChange}
          onAdd={addFilm}
          values={newMovie}
          checkForm={checkForm}
          checkUrl={checkUrl}
        />
      </div>
    </div>
  );
};
