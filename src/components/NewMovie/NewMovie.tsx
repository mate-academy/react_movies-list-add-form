import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validationPattern } from '../../utils/urlValidationPattern';

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

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovie);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const isEmpty = !title.trim()
    || !imdbId.trim()
    || !imdbUrl.trim()
    || !imgUrl.trim();
  const isPassingValidation = validationPattern.test(imdbUrl)
    && validationPattern.test(imgUrl);

  const handleChangeFieldValue = (event:
  React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);

    setCount((currentCount) => currentCount + 1);
    setMovie(initialMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChangeFieldValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChangeFieldValue}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChangeFieldValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isEmpty || !isPassingValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
