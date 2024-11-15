import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    description: '',
    imdbId: '',
  });
  const [error, setError] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChanges = (fieldName: string, newValue: string) => {
    setMovie(prevState => ({
      ...prevState,
      [fieldName]: newValue,
    }));
    setError(prevError => ({
      ...prevError,
      [fieldName]: '',
    }));
  };

  const handleErrors = () => {
    const newError = {
      title: movie.title.trim() ? '' : 'Title is required',
      imgUrl: movie.imgUrl.trim() ? '' : 'Image URL is required',
      imdbUrl: movie.imdbUrl.trim() ? '' : 'Imdb URL is required',
      imdbId: movie.imdbId.trim() ? '' : 'Imdb ID is required',
    };

    setError(newError);

    return !Object.values(newError).some(value => value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (handleErrors()) {
      onAdd(movie);

      setMovie({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        description: '',
        imdbId: '',
      });

      setError({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setCount(prevCount => prevCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleChanges('title', newValue)}
        required
        errorMessage={error.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => handleChanges('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => handleChanges('imgUrl', newValue)}
        required
        errorMessage={error.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleChanges('imdbUrl', newValue)}
        required
        errorMessage={error.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => handleChanges('imdbId', newValue)}
        required
        errorMessage={error.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              movie.title.length === 0 ||
              movie.imdbId.length === 0 ||
              movie.imdbUrl.length === 0 ||
              movie.imgUrl.length === 0
                ? true
                : false
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
