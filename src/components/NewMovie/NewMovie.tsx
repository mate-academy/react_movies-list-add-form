import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd } : Props) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const handleDisable
  = !movie.title || !movie.imgUrl || !movie.imdbUrl || !movie.imdbId;

  const handleInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie((prev) => (
      { ...prev, [event.target.name]: event.target.value }
    ));
  };

  const reset = () => {
    setMovie({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  const handleSubmit = () => {
    setCount(count + 1);
    reset();
    onAdd(movie);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputs}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputs}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputs}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputs}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputs}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={handleDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
