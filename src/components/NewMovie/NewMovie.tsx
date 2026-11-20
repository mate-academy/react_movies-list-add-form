import { useState } from 'react';
import { TextField } from '../TextField';

const emptyMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState(emptyMovie);

  const handleSubmit = event => {
    event.preventDefault();
    onAdd?.({
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });
    setNewMovie(emptyMovie);
    setCount(prevCount => prevCount + 1);
  };

  const isValid =
    newMovie.title.trim() !== '' &&
    newMovie.imgUrl.trim() !== '' &&
    newMovie.imdbUrl.trim() !== '' &&
    newMovie.imdbId.trim() !== '';

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => {
          setNewMovie({
            ...newMovie,
            title: newValue,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => {
          setNewMovie({
            ...newMovie,
            description: newValue,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => {
          setNewMovie({
            ...newMovie,
            imgUrl: newValue,
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => {
          setNewMovie({
            ...newMovie,
            imdbUrl: newValue,
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => {
          setNewMovie({
            ...newMovie,
            imdbId: newValue,
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
