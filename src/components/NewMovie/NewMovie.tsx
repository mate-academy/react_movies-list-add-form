import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = ({ onAdd }: Props) => {
  const initialNewMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(initialNewMovie);
  const [errorMessage, setErrorMessage] = useState('');

  const isUrlValid = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !isUrlValid(newMovie.imgUrl)
      || !isUrlValid(newMovie.imdbUrl)
      || !newMovie.title.trim()
      || !newMovie.imdbId.trim()
    ) {
      setErrorMessage('Please fill in all fields with valid data.');

      return;
    }

    setErrorMessage('');

    onAdd(newMovie);

    setNewMovie(initialNewMovie);
    setCount(prevCount => prevCount + 1);
  };

  const handleChange = (name: string, value: string) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(newValue: string) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue: string) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newValue: string) => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newValue: string) => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newValue: string) => handleChange('imdbId', newValue)}
        required
      />

      {errorMessage && (
        <div
          className="error-message"
          style={{ color: 'red' }}
        >
          {errorMessage}
        </div>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !newMovie.title
              || !newMovie.imgUrl
              || !newMovie.imdbUrl
              || !newMovie.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
