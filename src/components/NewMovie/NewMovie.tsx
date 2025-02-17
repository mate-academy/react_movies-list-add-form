import { useState } from 'react';
import { TextField } from '../TextField';

export type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [error, setError] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      setError(true);
    }
    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setError(false);
    setCount(prev => prev + 1);
  };

  const validateUrl = (url: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url) ? null : 'Invalid URL';
  };

  const isFormValid =
    movie.title.trim() &&
    movie.imgUrl.trim() &&
    movie.imdbUrl.trim() &&
    movie.imdbId.trim() &&
    validateUrl(movie.imgUrl) === null &&
    validateUrl(movie.imdbUrl) === null;
  return (
    <form className="NewMovie" key={count} onSubmit={e => handleSubmit(e)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        data-cy="movie-title"
        value={movie.title}
        onChange={e => setMovie({ ...movie, title: e })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={e => setMovie({ ...movie, description: e })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={e => setMovie({ ...movie, imgUrl: e })}
        isSubmitted={error}
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={e => setMovie({ ...movie, imdbUrl: e })}
        isSubmitted={error}
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={e => setMovie({ ...movie, imdbId: e })}
        isSubmitted={error}
        required
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
