import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\w]*))?)$/;

  const validateUrl = (value: string) => {
    return pattern.test(value);
  };

  const isDisabled =
    movie.title.trim() === '' ||
    movie.imgUrl.trim() === '' ||
    movie.imdbUrl.trim() === '' ||
    movie.imdbId.trim() === '' ||
    !validateUrl(movie.imgUrl) ||
    !validateUrl(movie.imdbUrl);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onAdd(movie);
        setMovie({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
        setCount(currentCount => currentCount + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => {
          setMovie(currentMovie => ({
            ...currentMovie,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => {
          setMovie({ ...movie, description: newValue });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => {
          setMovie({ ...movie, imgUrl: newValue });
        }}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => {
          setMovie({ ...movie, imdbUrl: newValue });
        }}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => {
          setMovie({ ...movie, imdbId: newValue });
        }}
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
