import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

type MovieForm = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<MovieForm>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const handleChange = (name: keyof MovieForm) => (value: string) => {
    setNewMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const isValid = (['title', 'imgUrl', 'imdbUrl', 'imdbId'] as const).every(
    field => newMovie[field].trim() !== '',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    const movie: Movie = {
      title: newMovie.title.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
      description: newMovie.description.trim(),
    };

    onAdd(movie);
    setNewMovie({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
    setCount(prev => prev + 1);
  };

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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
