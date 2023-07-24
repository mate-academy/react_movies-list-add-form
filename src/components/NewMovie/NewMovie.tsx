import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const initialState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState(initialState);
  const buttonHandler = (
  ) => {
    setCount(prevState => (prevState + 1));
    onAdd(movie);
    setMovie(initialState);
  };

  const {
    title,
    imdbUrl,
    imgUrl,
    imdbId,
  } = movie;

  const formIsReady = (title) && (imdbUrl.match(pattern) !== null)
    && (imgUrl.match(pattern) !== null) && imdbId.length > 0;

  const handleInputField = (name: string, event: string) => {
    setMovie(prevState => ({
      ...prevState,
      [name]: event,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={buttonHandler}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => handleInputField('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => handleInputField('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => handleInputField('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => handleInputField('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => handleInputField('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formIsReady}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
