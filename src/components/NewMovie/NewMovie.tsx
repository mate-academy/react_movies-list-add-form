import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;
  const isCanAddMovie = Boolean(title && imgUrl && imdbUrl && imdbId);

  const addFieldValue = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, name } = target;

    setNewMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onChange={addFieldValue}>
      <h2 className="title">Add a movie</h2>

      <TextField name="title" label="Title" value={title} required />

      <TextField name="description" label="Description" value={description} />

      <TextField name="imgUrl" label="Image URL" value={imgUrl} required />

      <TextField name="imdbUrl" label="Imdb URL" value={imdbUrl} required />

      <TextField name="imdbId" label="Imdb ID" value={imdbId} required />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isCanAddMovie}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
