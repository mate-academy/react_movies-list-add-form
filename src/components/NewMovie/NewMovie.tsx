import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: Dispatch<SetStateAction<Movie[]>>;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const addActive = !newMovie.title
    || !newMovie.imgUrl
    || !newMovie.imdbUrl
    || !newMovie.imdbId;

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(prev => [...prev, newMovie]);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={setNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={setNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={setNewMovie}
        required
        hasUrlError={imgUrlError}
        changeUrlError={setImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={setNewMovie}
        required
        hasUrlError={imdbUrlError}
        changeUrlError={setImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={setNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={addActive || imgUrlError || imdbUrlError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
