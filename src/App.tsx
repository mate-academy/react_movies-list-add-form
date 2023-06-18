import { useState } from 'react';
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
  const [allMovies, setAllMovies] = useState([...moviesFromServer]);
  const handlerChange = ({ name, value }: {
    name: string,
    value: string,
  }) => {
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
    setAllMovies(prevState => ([
      ...prevState,
      {
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
        <MoviesList movies={allMovies} />
      </div>
      <div className="sidebar">
        <NewMovie
          onChange={handlerChange}
          formInputs={formInputs}
          onAdd={addMovies}
        />
      </div>
    </div>
  );
};
