import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { useNewMovie } from './useNewMovie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const { count, movie, formErrors, isDisabled, onSubmit, onChange } =
    useNewMovie({
      onSubmit: onAdd,
    });

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        error={formErrors.imgUrl}
        value={movie.imgUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        error={formErrors.imdbUrl}
        value={movie.imdbUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={onChange}
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
