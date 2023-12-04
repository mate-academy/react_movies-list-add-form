import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export type NewMovieProps = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
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

  const isButtonDisabled = (): boolean => {
    if (newMovie.title.trim().length === 0
    || newMovie.imgUrl.trim().length === 0
    || newMovie.imdbUrl.trim().length === 0
    || newMovie.imdbId.trim().length === 0) {
      return true;
    }

    return false;
  };

  const handleChange = (name: keyof Movie, value: string) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const createMovie = (event: React.MouseEvent) => {
    event.preventDefault();

    const trimmedMovie: Movie = {
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    };

    if (
      trimmedMovie.title.length === 0
      || trimmedMovie.imgUrl.length === 0
      || trimmedMovie.imdbUrl.length === 0
      || trimmedMovie.imdbId.length === 0
    ) {
      return;
    }

    onAdd(trimmedMovie);
    setCount((prev) => prev + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled()}
            onClick={createMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
