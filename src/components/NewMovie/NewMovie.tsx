import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

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

  const isFormValid =
    newMovie.title.trim() !== '' &&
    newMovie.imgUrl.trim() !== '' &&
    newMovie.imdbUrl.trim() !== '' &&
    newMovie.imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(count + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => {
          setNewMovie({ ...newMovie, title: value });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => {
          setNewMovie({ ...newMovie, description: value });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={value => {
          setNewMovie({ ...newMovie, imgUrl: value });
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={value => {
          setNewMovie({ ...newMovie, imdbUrl: value });
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={value => {
          setNewMovie({ ...newMovie, imdbId: value });
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
