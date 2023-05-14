import './App.scss';
import { useState } from 'react';
import { MoviesList } from './components/MoviesList';
import { NewMovie } from './components/NewMovie';
import moviesFromServer from './api/movies.json';

export const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const [movies, setTodos] = useState(moviesFromServer);
  const [isDisabled, setIsDisabled] = useState(false);
  const [touchedName, setTouchedName] = useState(false);
  const [touchedImgUrl, setTouchedImgUrl] = useState(false);
  const [touchedImdbUrl, setTouchedImdbUrl] = useState(false);
  const [touchedImdbId, setTouchedImdbId] = useState(false);

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const addOn = () => {
    if (title !== ''
      && imdbId !== ''
      && imgUrl !== ''
      && imdbUrl !== '') {
      setTodos([...movies, movie]);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setimdbId('');
    } else {
      setIsDisabled(true);
      setTouchedName(true);
      setTouchedImgUrl(true);
      setTouchedImdbUrl(true);
      setTouchedImdbId(true);
    }
  };

  return (
    <div className="page">
      <div className="page-content">
        <MoviesList movies={movies} />
      </div>
      <div className="sidebar">
        <NewMovie
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          imdbUrl={imdbUrl}
          setImdbUrl={setImdbUrl}
          imdbId={imdbId}
          setimdbId={setimdbId}
          addOn={addOn}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
          touchedName={touchedName}
          setTouchedName={setTouchedName}
          touchedImgUrl={touchedImgUrl}
          touchedImdbUrl={touchedImdbUrl}
          touchedImdbId={touchedImdbId}
          setTouchedImgUrl={setTouchedImgUrl}
          setTouchedImdbUrl={setTouchedImdbUrl}
          setTouchedImdbId={setTouchedImdbId}
        />
      </div>
    </div>
  );
};
