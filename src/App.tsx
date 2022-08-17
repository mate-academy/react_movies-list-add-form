import './App.scss';
import React, { FormEvent, useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [newMoviesList, setNewMoviesList] = useState(moviesFromServer);
  const hasError = !(title && imgUrl && imdbUrl && imdbId);
  const [count, setCount] = useState(0);

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (hasError === false) {
      setNewMoviesList(prevState => {
        const newMovie = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        return [...prevState, newMovie];
      });

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount(prevState => prevState + 1);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={newMoviesList} />
      </div>
      <div className="sidebar">
        <NewMovie
          title={title}
          description={description}
          imgUrl={imgUrl}
          imdbUrl={imdbUrl}
          imdbId={imdbId}
          setTitle={setTitle}
          setDescription={setDescription}
          setImgUrl={setImgUrl}
          setImdbUrl={setImdbUrl}
          setImdbId={setImdbId}
          hasError={hasError}
          submit={submit}
          count={count}
        />
      </div>
    </div>
  );
};
