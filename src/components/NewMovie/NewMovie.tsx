import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const [movie, setMovie] = useState({
    title: {
      value: '',
      isRequired: true,
    },
    description: {
      value: '',
      isRequired: false,
    },
    imgUrl: {
      value: '',
      isRequired: true,
    },
    imdbUrl: {
      value: '',
      isRequired: true,
    },
    imdbId: {
      value: '',
      isRequired: true,
    },
  });

  const [count, setCount] = useState(0);
  const hasErrors = (movie.title.isRequired && !movie.title.value)
    || (movie.description.isRequired && !movie.description.value)
    || (movie.imgUrl.isRequired && !movie.imgUrl.value)
    || (movie.imdbUrl.isRequired && !movie.imdbUrl.value)
    || (movie.imdbId.isRequired && !movie.imdbId.value)
    || !pattern.test(movie.imgUrl.value)
    || !pattern.test(movie.imdbUrl.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: {
        ...prevMovie[name as keyof typeof prevMovie],
        value,
      },
    }));
  };

  const resetForm = () => {
    setMovie(prevMovie => ({
      title: {
        ...prevMovie.title,
        value: '',
      },
      description: {
        ...prevMovie.description,
        value: '',
      },
      imgUrl: {
        ...prevMovie.imgUrl,
        value: '',
      },
      imdbUrl: {
        ...prevMovie.imdbUrl,
        value: '',
      },
      imdbId: {
        ...prevMovie.imdbId,
        value: '',
      },
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    const newMovie: Movie = {
      title: movie.title.value,
      description: movie.description.value,
      imgUrl: movie.imgUrl.value,
      imdbUrl: movie.imdbUrl.value,
      imdbId: movie.imdbId.value,
    };

    event.preventDefault();
    setCount(prev => prev + 1);
    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title.value}
        onChange={handleChange}
        required={movie.title.isRequired}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description.value}
        onChange={handleChange}
        required={movie.description.isRequired}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl.value}
        onChange={handleChange}
        required={movie.imgUrl.isRequired}
        validationFunc={() => pattern.test(movie.imgUrl.value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl.value}
        onChange={handleChange}
        required={movie.imdbUrl.isRequired}
        validationFunc={() => pattern.test(movie.imdbUrl.value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId.value}
        onChange={handleChange}
        required={movie.imdbId.isRequired}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
