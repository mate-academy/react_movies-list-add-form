import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  // #region States
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imdbUrl: '',
    imgUrl: '',
    imdbId: '',
  });
  const [hasNewMovieError, setHasNewMovieError] = useState({
    titleError: false,
    imdbUrlError: false,
    imgUrlError: false,
    imdbIdError: false,
  });
  const [buttonView, setButtonView] = useState(true);
  // #endregion

  // #region Functions
  const checkButtonVisibility = () => {
    if (newMovie.title
      && newMovie.imdbUrl
      && newMovie.imgUrl
      && newMovie.imdbId) {
      setButtonView(false);
    } else {
      setButtonView(true);
    }
  };

  const reset = () => {
    setNewMovie((prewMovie) => ({
      ...prewMovie,
      title: '',
      description: '',
      imdbUrl: '',
      imgUrl: '',
      imdbId: '',
    }));
    setButtonView(true);
  };

  const handleMovieAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasNewMovieError((prewErrors) => ({
      ...prewErrors,
      titleError: !newMovie.title,
      imdbUrlError: !newMovie.imdbUrl,
      imgUrlError: !newMovie.imgUrl,
      imdbIdError: !newMovie.imdbId,
    }));

    if (hasNewMovieError.titleError
      || hasNewMovieError.imdbUrlError
      || hasNewMovieError.imgUrlError
      || hasNewMovieError.imdbIdError) {
      return;
    }

    onAdd(newMovie);

    setCount(count + 1);
    reset();
  };
  // #endregion

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleMovieAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={
          (newValue) => {
            setNewMovie({ ...newMovie, title: newValue });
            checkButtonVisibility();
          }
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={
          (newValue) => {
            setNewMovie({ ...newMovie, description: newValue });
            checkButtonVisibility();
          }
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={
          (newValue) => {
            setNewMovie({ ...newMovie, imgUrl: newValue });
            checkButtonVisibility();
          }
        }
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={
          (newValue) => {
            setNewMovie({ ...newMovie, imdbUrl: newValue });
            checkButtonVisibility();
          }
        }
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={
          (newValue) => {
            setNewMovie({ ...newMovie, imdbId: newValue });
            checkButtonVisibility();
          }
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonView}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
