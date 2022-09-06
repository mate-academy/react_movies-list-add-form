import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const emptyMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = (props) => {
  const { onAdd } = props;
  const [movie, setMovie] = useState(emptyMovie);
  const [errors, setErrors] = useState({
    title: true,
    description: false,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  });
  // eslint-disable-next-line max-len
  const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const handleChange = (name: string, value: string, error: boolean): void => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onAdd(movie);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={Object.values(errors).some(error => error)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
