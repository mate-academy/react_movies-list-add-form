import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialFieldsOfMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [fieldsOfMovie, setFieldsOfMovie] = useState(initialFieldsOfMovie);

  const isDisabled = !(
    fieldsOfMovie.title.trim()
    && fieldsOfMovie.imgUrl.trim()
    && fieldsOfMovie.imdbUrl.trim()
    && fieldsOfMovie.imdbId.trim());

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: fieldsOfMovie.title,
      description: fieldsOfMovie.description,
      imgUrl: fieldsOfMovie.imgUrl,
      imdbUrl: fieldsOfMovie.imdbUrl,
      imdbId: fieldsOfMovie.imdbId,
    };

    onAdd(newMovie);

    setCount((prevValue) => prevValue + 1);
    setFieldsOfMovie(initialFieldsOfMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fieldsOfMovie.title}
        onChange={(newTitle) => setFieldsOfMovie({
          ...fieldsOfMovie,
          title: newTitle,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fieldsOfMovie.description}
        onChange={(newDescription) => setFieldsOfMovie({
          ...fieldsOfMovie,
          description: newDescription,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fieldsOfMovie.imgUrl}
        onChange={(newImgUrl) => setFieldsOfMovie({
          ...fieldsOfMovie,
          imgUrl: newImgUrl,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fieldsOfMovie.imdbUrl}
        onChange={(newImdbUrl) => setFieldsOfMovie({
          ...fieldsOfMovie,
          imdbUrl: newImdbUrl,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fieldsOfMovie.imdbId}
        onChange={(newImdbId) => setFieldsOfMovie({
          ...fieldsOfMovie,
          imdbId: newImdbId,
        })}
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
