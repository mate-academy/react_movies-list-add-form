import React, { useState } from 'react';
import { TextField } from '../TextField';
import { NewMovieProps } from '../../types/Movie';

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isFormHasChar = () => {
    return (
      movie.title ||
      movie.imgUrl ||
      movie.imdbUrl ||
      movie.imdbId ||
      movie.description
    );
  };

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const [hasErrors, setHasErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    const newErrors = {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    };

    if (!movie.title) {
      newErrors.title = true;
      hasError = true;
    }

    if (!movie.imgUrl) {
      newErrors.imgUrl = true;
      hasError = true;
    }

    if (!movie.imdbUrl) {
      newErrors.imdbUrl = true;
      hasError = true;
    }

    if (!movie.imdbId) {
      newErrors.imdbId = true;
      hasError = true;
    }

    if (hasError) {
      setHasErrors(newErrors);

      return;
    }

    const newMovie = { ...movie };

    onAdd(newMovie);

    reset();

    setCount(count + 1);

    setHasErrors({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const handleChange = (name: string) => (newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: newValue,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        required
        externalError={hasErrors.title}
        resetErrorState={count > 0}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
        resetErrorState={count > 0}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        externalError={hasErrors.imgUrl}
        resetErrorState={count > 0}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        externalError={hasErrors.imdbUrl}
        resetErrorState={count > 0}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        externalError={hasErrors.imdbId}
        resetErrorState={count > 0}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormHasChar().trim()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
