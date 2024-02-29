import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

/* eslint-disable max-len */
const pattern =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
/* eslint-disable max-len */

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovieState);

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const isValidImgUrl = pattern.test(imgUrl);
  const isValidImdbUrll = pattern.test(imdbUrl);

  const isNotReadyToSubmit =
    !isValidImgUrl ||
    !isValidImdbUrll ||
    !title.trim() ||
    !imgUrl.trim() ||
    !imdbUrl.trim() ||
    !imdbId.trim();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!isNotReadyToSubmit) {
      setCount(prevCount => prevCount + 1);
      onAdd(movie);
      setMovie(initialMovieState);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputChange}
        urlValidation={isValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChange}
        urlValidation={isValidImdbUrll}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isNotReadyToSubmit}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
