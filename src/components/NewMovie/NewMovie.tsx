import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
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
  const [validForm, setValidForm] = useState(false);

  useEffect(() => {
    const {
      title, imgUrl, imdbUrl, imdbId,
    } = newMovie;

    setValidForm(
      (!!title && !!imgUrl && !!imdbUrl && !!imdbId)
      && document.querySelectorAll('.is-danger').length === 0,
    );
  }, [newMovie]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e) => {
        e.preventDefault();

        if (validForm) {
          onAdd(newMovie);
          setCount(count + 1);
          setNewMovie({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event) => {
          setNewMovie({ ...newMovie, title: event });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event) => {
          setNewMovie({ ...newMovie, description: event });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event) => {
          setNewMovie({ ...newMovie, imgUrl: event });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event) => {
          setNewMovie({ ...newMovie, imdbUrl: event });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event) => {
          setNewMovie({ ...newMovie, imdbId: event });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
