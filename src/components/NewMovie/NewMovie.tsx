import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import React from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const formValidation =
    newMovie.title.trim() &&
    newMovie.imdbId.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim();

  const handleChange = (newValue: string, name: keyof Movie) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: newValue }));
  };

  const handleSubmit = (evnt: React.FormEvent) => {
    evnt.preventDefault();
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
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => handleChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => handleChange(newValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => handleChange(newValue, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => handleChange(newValue, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => handleChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
