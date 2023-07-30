import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Prop = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie = ({ onAdd }: Prop) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const emptyForms = newMovie.title.trim() === ''
    || newMovie.imgUrl.trim() === ''
    || newMovie.imdbUrl.trim() === ''
    || newMovie.imdbId.trim() === '';

  const reset = () => {
    setNewMovie({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  function sendInfo(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setCount(count + 1);
    onAdd({
      title: newMovie.title,
      description: newMovie.description,
      imgUrl: newMovie.imgUrl,
      imdbUrl: newMovie.imdbUrl,
      imdbId: newMovie.imdbId,
    });
    reset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={sendInfo}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value) => setNewMovie({ ...newMovie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={(value) => setNewMovie({ ...newMovie, description: value })}
        value={newMovie.description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => setNewMovie({ ...newMovie, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={emptyForms}
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
