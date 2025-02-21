import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const urlPattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/+[~%/\\.\\w-_]*)?' +
      '\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,.!/\\\\w]*))?)$',
  );

  const validateUrl = (value: string) => urlPattern.test(value);
  const isImgUrlValid = newMovie.imgUrl !== '' && validateUrl(newMovie.imgUrl);
  const isImdbUrlValid =
    newMovie.imdbUrl !== '' && validateUrl(newMovie.imdbUrl);

  const showButton = !(
    newMovie.title &&
    newMovie.imdbId &&
    isImgUrlValid &&
    isImdbUrlValid
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });

    setCount(prevCount => prevCount + 1);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
        validateUrl={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
        validateUrl={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={showButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
