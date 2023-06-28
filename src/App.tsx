import { ChangeEvent, useState } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';
import { Movie } from './types/Movie';

export const App = () => {
  const [formInputs, setFormInputs] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [movies, setMovies] = useState(moviesFromServer);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addMovies = ({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  }: Movie) => {
    setMovies(prevState => ([...prevState, {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    },
    ]));

    setFormInputs({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onChange={handleChange}
          formInputs={formInputs}
          onAdd={addMovies}
        />
      </div>
    </div>
  );
};
