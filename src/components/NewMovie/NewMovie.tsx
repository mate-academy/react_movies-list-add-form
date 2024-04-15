import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    setMovie({
      ...movie,
      [name]: event.target.value,
    });
  };

  let buttonDisabler = true;

  const addMovieButton = () => {
    /* eslint-disable max-len */
    const pattern =
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
    const validImgUrl = pattern.test(movie.imgUrl);
    const validImdbUrl = pattern.test(movie.imdbUrl);

    if (
      movie.title.trim() &&
      validImgUrl &&
      validImdbUrl &&
      movie.imdbId.trim()
    ) {
      buttonDisabler = false;

      return;
    }

    buttonDisabler = true;

    return;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(count + 1);
  };

  addMovieButton();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={onChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabler}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
