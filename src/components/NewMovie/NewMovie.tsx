import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { DEFAULT_MOVIE_VALUE, pattern } from '../../utils';

type Props = {
  onAdd: (arg: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState(DEFAULT_MOVIE_VALUE);

  const [count, setCount] = useState(0);

  const handleChangeMovie = (name: string, value: string) => setNewMovie({
    ...newMovie,
    [name]: value,
  });

  const isValidImdbUrl = newMovie.imdbUrl.match(pattern);
  const isValidImgUrl = newMovie.imgUrl.match(pattern);

  const isValidMovie = !!newMovie.title.trim()
    && !!newMovie.imdbId
    && isValidImdbUrl
    && isValidImgUrl;

  const handleSubmit: React.FormEventHandler<HTMLFormElement>
  = (event) => {
    event.preventDefault();

    setCount(prevValue => prevValue + 1);
    onAdd(newMovie);
    setNewMovie(DEFAULT_MOVIE_VALUE);
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
        onChange={(value: string):void => handleChangeMovie('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value: string):void => {
          handleChangeMovie('description', value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value: string):void => handleChangeMovie('imgUrl', value)}
        isValid={!isValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value: string):void => handleChangeMovie('imdbUrl', value)}
        isValid={!isValidImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value: string):void => handleChangeMovie('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
