import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const initialState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [newMovie, setNewMovie] = useState<Movie>(initialState);
  const [count, setCount] = useState(0);

  const isValid =
    newMovie.title.trim() !== '' &&
    newMovie.imgUrl.trim() !== '' &&
    newMovie.imdbUrl.trim() !== '' &&
    newMovie.imdbId.trim() !== '';

  const handleNewMovie = (keyName: string, value: string) => {
    return setNewMovie({
      ...newMovie,
      [keyName]: value,
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const movieToAdd: Movie = {
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    };

    onAdd(movieToAdd);

    setNewMovie(initialState);
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => {
          handleNewMovie('title', value);
        }}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => {
          handleNewMovie('description', value);
        }}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => {
          handleNewMovie('imgUrl', value);
        }}
        required
      />{' '}
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => {
          handleNewMovie('imdbUrl', value);
        }}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => {
          handleNewMovie('imdbId', value);
        }}
        required
      />{' '}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
