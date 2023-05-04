import { ChangeEvent, FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd?: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd = () => {} }) => {
  const [count, setCount] = useState(0);
  const emptyMovieObject = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(emptyMovieObject);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  // eslint-disable-next-line max-len
  const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const validateUrl = (url: string): boolean => {
    return urlPattern.test(url);
  };

  const allFieldsAreValid = title.trim() && imdbId.trim()
      && validateUrl(imdbUrl) && validateUrl(imgUrl);

  const handleChangeMovie = (value: string, key: string) => {
    setMovie({
      ...movie,
      [key]: value,
    });
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setMovie(emptyMovieObject);
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChangeMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsAreValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
