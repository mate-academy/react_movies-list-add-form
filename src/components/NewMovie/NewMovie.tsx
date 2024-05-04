import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [validateImgUrl, setValidateImgUrl] = useState(false);
  const [validateImdbUrl, setValidateImdbUrl] = useState(false);

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const validateImg = (value: boolean) => {
    setValidateImgUrl(value);
  };

  const validateImdb = (value: boolean) => {
    setValidateImdbUrl(value);
  };

  const isDisabled =
    newMovie.title === '' ||
    newMovie.imdbId === '' ||
    newMovie.imdbUrl === '' ||
    newMovie.imgUrl === '' ||
    validateImgUrl ||
    validateImdbUrl;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(prev => prev + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(name, value) => {
          setNewMovie(prevMovies => ({ ...prevMovies, [name]: value }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(name, value) => {
          setNewMovie(prevMovies => ({ ...prevMovies, [name]: value }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(name, value) => {
          setNewMovie(prevMovies => ({ ...prevMovies, [name]: value }));
        }}
        handleValidate={value => validateImg(value)}
        validation={validateImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(name, value) => {
          setNewMovie(prevMovies => ({ ...prevMovies, [name]: value }));
        }}
        handleValidate={value => validateImdb(value)}
        validation={validateImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(name, value) => {
          setNewMovie(prevMovies => ({ ...prevMovies, [name]: value }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
