import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (value: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const isButtonDisabled = !!(
    newMovie.title &&
    newMovie.imgUrl &&
    newMovie.imdbUrl &&
    newMovie.imdbId
  );

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie: Movie) => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !newMovie.title.trim() ||
      !newMovie.imgUrl.trim() ||
      !newMovie.imdbUrl.trim() ||
      !newMovie.imdbId.trim()
    ) {
      return;
    }

    onAdd({
      title: newMovie.title,
      description: newMovie.description,
      imgUrl: newMovie.imgUrl,
      imdbUrl: newMovie.imdbUrl,
      imdbId: newMovie.imdbId,
    });

    setCount(prev => prev + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={e => {
          handleChange(e);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={e => {
          handleChange(e);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={e => {
          handleChange(e);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={e => {
          handleChange(e);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={e => {
          handleChange(e);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
