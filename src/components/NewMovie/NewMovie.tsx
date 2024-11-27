import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { trimValues } from '../../utils/trimValues';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const INITIAL_NEW_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(INITIAL_NEW_MOVIE);

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  const handleSetNewValue = (property: string, value: string) => {
    setNewMovie(current => {
      return {
        ...current,
        [property]: value,
      };
    });
  };

  const isNewMovieValid = title && imgUrl && imdbUrl && imdbId;

  const handleResetNewMovie = () => {
    setNewMovie(INITIAL_NEW_MOVIE);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd(trimValues(newMovie));

    setCount(current => current + 1);

    handleResetNewMovie();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => handleSetNewValue('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleSetNewValue('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleSetNewValue('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleSetNewValue('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleSetNewValue('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isNewMovieValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
