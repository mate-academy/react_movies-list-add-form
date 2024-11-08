import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  const hasDisable = !title || !imgUrl || !imdbUrl || !imdbId;

  let hasRequired = true;

  function reset() {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    hasRequired = true;
  }

  function handleAdd(event: React.FormEvent) {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prevCount => prevCount + 1);

    reset();
  }

  const changeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const trimmedValue = value.replace(/^\s+/, '');

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: trimmedValue }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleAdd}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={changeHandle}
        required={hasRequired}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeHandle}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={changeHandle}
        required={hasRequired}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={changeHandle}
        required={hasRequired}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={changeHandle}
        required={hasRequired}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={hasDisable}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
