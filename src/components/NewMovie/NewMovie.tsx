import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const EMPTY = '';

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState(EMPTY);
  const [description, setDescription] = useState(EMPTY);
  const [imgUrl, setImgUrl] = useState(EMPTY);
  const [imdbUrl, setImdbUrl] = useState(EMPTY);
  const [imdbId, setImdbId] = useState(EMPTY);

  const activeButton
    = !!title.trim() && !!imgUrl.trim() && !!imdbUrl.trim() && !!imdbId.trim();

  const resetForm = () => {
    setTitle(EMPTY);
    setDescription(EMPTY);
    setImgUrl(EMPTY);
    setImdbUrl(EMPTY);
    setImdbId(EMPTY);
  };

  const handleAddClick = () => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    resetForm();

    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!activeButton}
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
