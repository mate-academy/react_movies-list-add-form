import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isVeryfied, setIsVeryfied] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const isAllVeryfied = isVeryfied.title
    && isVeryfied.description
    && isVeryfied.imgUrl
    && isVeryfied.imdbUrl
    && isVeryfied.imdbId;

  const customValidation = (value: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const result = pattern.test(value);

    return result;
  };

  const changeMovieField = (field: string, newValue: string) => {
    const nextMovie = {
      ...newMovie,
      [field]: newValue,
    };

    setNewMovie(nextMovie);
    setIsVeryfied({
      title: !!nextMovie.title,
      description: !!nextMovie.description,
      imgUrl: !!nextMovie.imgUrl && customValidation(nextMovie.imgUrl),
      imdbUrl: !!nextMovie.imdbUrl && customValidation(nextMovie.imdbUrl),
      imdbId: !!nextMovie.imdbId,
    });
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isAllVeryfied) {
      setCount(oldValue => oldValue + 1);
      onAdd(newMovie);
      reset();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handeSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={changeMovieField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={changeMovieField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={changeMovieField}
        customValidation={customValidation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={changeMovieField}
        customValidation={customValidation}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={changeMovieField}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllVeryfied}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
