import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialNewMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(initialNewMovie);

  const onInputChange = (field: keyof Movie, value: string) => {
    setNewMovie(currentNewMovie => ({
      ...currentNewMovie,
      [field]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });

    setNewMovie(initialNewMovie);
    setCount(currentCount => currentCount + 1);
  };

  const requiredFields: Array<keyof Movie> = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isFormValid = () => {
    return requiredFields.every(field => {
      const value = newMovie[field];

      return value.trim().length > 0;
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => onInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => onInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => onInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => onInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => onInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
