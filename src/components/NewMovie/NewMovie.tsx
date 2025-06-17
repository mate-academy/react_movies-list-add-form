import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (item: Movie) => void;
};

interface MovieType {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

const initialMovieState: MovieType = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<MovieType>(initialMovieState);

  const handleFieldChange = (fieldName: keyof MovieType, value: string) => {
    setNewMovie(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    const { title, imgUrl, imdbUrl, imdbId } = newMovie;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({ ...newMovie });
    setNewMovie(initialMovieState);
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value: string) => handleFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value: string) => handleFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value: string) => handleFieldChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value: string) => handleFieldChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value: string) => handleFieldChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !newMovie.title.trim() ||
              !newMovie.imgUrl.trim() ||
              !newMovie.imdbUrl.trim() ||
              !newMovie.imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
