import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const initialMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovie);

  const isImdbUrlValid = movie.imdbUrl.match(pattern);
  const isImgUrlValid = movie.imgUrl.match(pattern);

  const isFromValid
    = movie.title.trim()
    && movie.imgUrl.trim()
    && movie.imdbUrl.trim()
    && movie.imdbId.trim()
    && isImdbUrlValid
    && isImgUrlValid;

  const handleInputChange = (key: string, value: string) => {
    setMovie((prevInputs) => ({ ...prevInputs, [key]: value }));
  };

  const reset = () => {
    setMovie(initialMovie);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(movie);
    setCount((currentCount) => currentCount + 1);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        validateUrl={(value) => pattern.test(value)}
        onChange={(value) => handleInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        validateUrl={(value) => pattern.test(value)}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFromValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
