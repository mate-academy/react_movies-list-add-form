import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { useState } from 'react';

export const NewMovie: React.FC<{ onAdd: (movie: Movie) => void }> = ({
  onAdd,
}) => {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const m: Movie = {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    Object.entries(newMovie).forEach(function ([k, v]) {
      m[k as keyof Movie] = v.trim();
    });

    onAdd(m);

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={v => {
          setNewMovie(prevNewMovie => ({ ...prevNewMovie, title: v }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={v => {
          setNewMovie(prevNewMovie => ({ ...prevNewMovie, description: v }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={v => {
          setNewMovie(prevNewMovie => ({ ...prevNewMovie, imgUrl: v }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={v => {
          setNewMovie(prevNewMovie => ({ ...prevNewMovie, imdbUrl: v }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={v => {
          setNewMovie(prevNewMovie => ({ ...prevNewMovie, imdbId: v }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !newMovie.title ||
              !newMovie.imgUrl ||
              !newMovie.imdbUrl ||
              !newMovie.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
