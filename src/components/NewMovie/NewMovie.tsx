import { useMemo, useState } from 'react';

import { Movie } from '../../types/Movie';

import { TextField } from '../TextField';

type Props = {
  onAdd:(movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultNewMovieFields = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(defaultNewMovieFields);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isValidValue = (key: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (key) {
      case 'title':
      case 'imdbId':
        return newMovie[key].replace(/\s/g, '') !== '';

      case 'imgUrl':
      case 'imdbUrl':
        return pattern.test(newMovie[key]);

      default:
        return true;
    }
  };

  const isValidData = useMemo(
    () => Object.keys(newMovie).every(key => isValidValue(key)),
    [newMovie],
  );

  const handleChange = ({ value, name }: HTMLInputElement) => {
    setNewMovie(movie => ({
      ...movie,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie(defaultNewMovieFields);
    setCount(countValue => countValue + 1);
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
        isValid={isValidValue('title')}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        isValid={isValidValue('description')}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        isValid={isValidValue('imgUrl')}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        isValid={isValidValue('imdbUrl')}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        isValid={isValidValue('imdbId')}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
