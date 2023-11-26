import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
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

  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleChange = (field: string, value: string) => {
    setMovie((prevMovie) => ({
      ...prevMovie,
      [field]: value,
    }));

    if (field === 'imdbUrl') {
      setImdbUrlError(!value.match(pattern));
    } else if (field === 'imgUrl') {
      setImgUrlError(!value.match(pattern));
    }
  };

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount((prevCount) => prevCount + 1);
    setImdbUrlError(false);
    setImgUrlError(false);
  };

  const requiredFields
  = !movie.title
    || !movie.imgUrl
    || !movie.imdbUrl
    || !movie.imdbId
    || imdbUrlError
    || imgUrlError;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (requiredFields) {
      return;
    }

    onAdd(movie);

    reset();
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
        value={movie.title}
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newValue) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        required
        customError={imgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        required
        customError={imdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={requiredFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
