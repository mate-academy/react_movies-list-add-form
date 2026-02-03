import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const emptyMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formCount, setFormCount] = useState(0);
  const [movie, setMovie] = useState(emptyMovie);

  const setMovieField = (field: keyof Movie) => (value: string) => {
    setMovie(current => ({ ...current, [field]: value }));
  };

  const isSubmitDisabled = (): boolean => {
    return (
      !movie.title.trim() ||
      !movie.imgUrl.trim() ||
      !movie.imdbUrl.trim() ||
      !movie.imdbId.trim()
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isSubmitDisabled()) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie(emptyMovie);
    setFormCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={formCount} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={setMovieField('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={setMovieField('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={setMovieField('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={setMovieField('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={setMovieField('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
