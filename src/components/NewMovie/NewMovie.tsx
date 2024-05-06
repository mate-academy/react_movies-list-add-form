import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initialNewMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [{ title, imdbId, imdbUrl, imgUrl, description }, setNewMovie] =
    useState(initialNewMovie);

  const isFormCompleted =
    !!title.trim() && !!imgUrl.trim() && !!imdbUrl.trim() && !!imdbId.trim();

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const currentMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(currentMovie);

    setNewMovie(initialNewMovie);

    setCount(currentCount => currentCount + 1);
  };

  const handlerOnChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setNewMovie(currentMovie => ({ ...currentMovie, [name]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handlerOnChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handlerOnChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handlerOnChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handlerOnChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handlerOnChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormCompleted}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
