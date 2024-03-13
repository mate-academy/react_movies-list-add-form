import { ChangeEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovie = {
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

  const [movie, setMovie] = useState(initialMovie);

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const isValidImgUrl = pattern.test(imgUrl);
  const isValidImdbUrll = pattern.test(imdbUrl);

  const handleFormDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie((prevMovie: Movie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const isDisabled =
    !title ||
    !imgUrl ||
    !imdbUrl ||
    !imdbId ||
    !isValidImgUrl ||
    !isValidImdbUrll;

  const handleReset = () => {
    setMovie(initialMovie);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    onAdd({
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    });
    setCount(prevCount => prevCount + 1);
    handleReset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleFormDataChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleFormDataChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleFormDataChange}
        urlIsValid={isValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleFormDataChange}
        urlIsValid={isValidImdbUrll}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleFormDataChange}
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
