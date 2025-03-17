import React, { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Prop = {
  onAdd: (movie: Movie) => void;
};

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Prop> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(defaultValues);

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const isInputsFilled =
    !!title.length && !!imgUrl.length && !!imdbUrl.length && !!imdbId.length;

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setMovie(defaultValues);

    setCount(prev => prev + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => setMovie({ ...movie, title: value })}
        required={!movie.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => setMovie({ ...movie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => setMovie({ ...movie, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => setMovie({ ...movie, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => setMovie({ ...movie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isInputsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
