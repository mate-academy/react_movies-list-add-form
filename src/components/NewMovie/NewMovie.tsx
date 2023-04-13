import React, { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';
import { pattern } from '../../regex/validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = React.memo((props) => {
  const movieInfo = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(movieInfo);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const {
    title,
    description,
    imdbId,
    imgUrl,
    imdbUrl,
  } = movie;

  const isDisabled = !(
    title.trim() && imdbId.trim() && imdbUrl.trim()
    && imgUrl.trim() && !isImdbUrlValid && !isImgUrlValid
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setCount(current => current + 1);

    props.onAdd(movie);

    setMovie(movieInfo);
  };

  const handleTitleChange = (value: string) => {
    setMovie(state => ({ ...state, title: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setMovie(state => ({ ...state, description: value }));
  };

  const handleImgUrlChange = (value: string) => {
    setMovie(state => ({
      ...state,
      imgUrl: value,
    }));
    setIsImgUrlValid(!pattern.test(value));
  };

  const handleImdbUrlChange = (value: string) => {
    setMovie(state => ({
      ...state,
      imdbUrl: value,
    }));
    setIsImdbUrlValid(!pattern.test(value));
  };

  const handleImdbIdChange = (value: string) => {
    setMovie(state => ({ ...state, imdbId: value }));
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
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        isValid={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        isValid={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
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
});
