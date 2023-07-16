import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const changeHandler = (value:string, name:string) => {
    setMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const isDisabled = !movie.title
    || !movie.imgUrl
    || !movie.imdbUrl
    || !movie.imdbId;

  const addMovie: Movie = {
    title: movie.title,
    description: movie.description,
    imgUrl: movie.imdbUrl,
    imdbUrl: movie.imdbUrl,
    imdbId: movie.imdbId,
  };

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }

    onAdd(addMovie);
    reset();
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value, name) => changeHandler(value, name)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value, name) => changeHandler(value, name)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value, name) => changeHandler(value, name)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value, name) => changeHandler(value, name)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value, name) => changeHandler(value, name)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
