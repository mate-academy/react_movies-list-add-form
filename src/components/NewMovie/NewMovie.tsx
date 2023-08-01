import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
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

  const handleButtonClick = () => {
    setCount(currentCount => currentCount + 1);
    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const formIsReady = (movie.title) && movie.imdbUrl.match(pattern)
    && movie.imgUrl.match(pattern) && movie.imdbId.length > 0;

  const handleInputField = (name: string, event: string) => {
    setMovie(currentCount => ({
      ...currentCount,
      [name]: event.trim(),
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleButtonClick}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => {
          handleInputField('title', event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => {
          handleInputField('description', event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => {
          handleInputField('imgUrl', event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => {
          handleInputField('imdbUrl', event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => {
          handleInputField('imdbId', event);
        }}
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
