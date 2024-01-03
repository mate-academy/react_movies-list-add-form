import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [count, setCount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [inputError, setInputError] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const validateForm = () => {
    const isValid = Object.entries(movie).every(([key, value]) => {
      return key === 'description' || (value && value.trim() !== '');
    });

    console.log('isValid:', isValid);
    setIsFormValid(isValid);
  };

  const handleFieldChange = (fieldName: string, newValue: string) => {
    setMovie(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));

    setInputError(prevState => ({
      ...prevState,
      [fieldName]: false,
    }));

    validateForm();
  };

  const reset = () => {
    setInputError({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!movie.title) {
      setInputError(pre => ({ ...pre, title: true }));
    }

    if (!movie.imgUrl) {
      setInputError(pre => ({ ...pre, imgUrl: true }));
    }

    if (!movie.imdbUrl) {
      setInputError(pre => ({ ...pre, imdbUrl: true }));
    }

    if (!movie.imdbId) {
      setInputError(pre => ({ ...pre, imdbId: true }));
    }

    validateForm();

    if (!isFormValid) {
      return;
    }

    onAdd(movie);
    reset();

    setCount(prevCount => prevCount + 1);
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
        value={movie.title}
        onChange={(value) => handleFieldChange('title', value)}
        required
      />
      {inputError.title && (
        <p className="help is-danger">Title is required</p>
      )}

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleFieldChange('description', value)}
      />
      {/* {inputError.description && (
        <p className="help is-danger">Description is required</p>
      )} */}

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => handleFieldChange('imgUrl', value)}
        required
      />
      {inputError.imgUrl && (
        <p className="help is-danger">Image URL is required</p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => handleFieldChange('imdbUrl', value)}
        required
      />
      {inputError.imdbUrl && (
        <p className="help is-danger">Imdb URL is required</p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleFieldChange('imdbId', value)}
        required
      />
      {inputError.imdbId && (
        <p className="help is-danger">Imdb ID is required</p>
      )}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
