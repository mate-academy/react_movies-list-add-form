import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validateTitle, validateUrl } from '../../helpers/validations';

interface Props {
  onAdd: (movie: Movie) => void;
}

const defaultMovie = (): Movie => ({
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
});

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState<Movie>(defaultMovie());

  const isValidForSubmit = !!(
    validateTitle(movie.title) &&
    validateUrl(movie.imgUrl) &&
    validateUrl(movie.imdbUrl) &&
    movie.imdbId.trim()
  );

  const handleChange = (field: keyof Movie) => (newValue: string) => {
    setMovie(prev => ({ ...prev, [field]: newValue }));
  };

  const onSubmit = () => {
    onAdd(movie);
    setMovie(defaultMovie());
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        validateValue={validateTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        validateValue={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        validateValue={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
