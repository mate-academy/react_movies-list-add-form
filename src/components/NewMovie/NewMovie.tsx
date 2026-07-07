import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const isSubmitAllowed =
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim() &&
    newMovie.imdbId.trim();

  function setMovieField(key: keyof Movie, value: string) {
    setNewMovie((prevState: Movie) => ({
      ...prevState,
      [key]: value,
    }));
  }

  function handleChange(key: keyof Movie) {
    return function (newValue: string) {
      setMovieField(key, newValue);
    };
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onAdd({
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(previousCount => previousCount + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmitAllowed}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
