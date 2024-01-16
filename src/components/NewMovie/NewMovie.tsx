import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie((prevMovie) => ({ ...prevMovie, [name]: value }));
  };

  const handleButtonDisabling = () => {
    const disabled = !newMovie.title.trim()
      || !newMovie.imgUrl.trim()
      || !newMovie.imdbUrl.trim()
      || !newMovie.imdbId.trim();

    return disabled;
  };

  const isButtonDisabled = handleButtonDisabling();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !newMovie.title.trim()
      || !newMovie.imgUrl.trim()
      || !newMovie.imdbUrl.trim()
      || !newMovie.imdbId.trim()
    ) {
      return;
    }

    setCount(count + 1);
    onAdd(newMovie);
    setNewMovie((prev) => ({
      ...prev,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(v) => {
          handleChange(v);
          handleButtonDisabling();
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(v) => {
          handleChange(v);
          handleButtonDisabling();
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(v) => {
          handleChange(v);
          handleButtonDisabling();
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(v) => {
          handleChange(v);
          handleButtonDisabling();
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
