import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (name: keyof Movie, value: string) => {
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const isValid = (): boolean => {
    return (
      !!movie.title.trim() &&
      !!movie.imgUrl.trim() &&
      !!movie.imdbUrl.trim() &&
      !!movie.imdbId.trim() &&
      urlPattern.test(movie.imgUrl) &&
      urlPattern.test(movie.imdbUrl)
    );
  };

  const resetForm = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }

    onAdd({ ...movie });
    resetForm();
  };

  return (
    <form key={count} className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
        required
        data-cy="movie-title"
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
        data-cy="movie-description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
        data-cy="movie-imgUrl"
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
        data-cy="movie-imdbUrl"
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
        data-cy="movie-imdbId"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
