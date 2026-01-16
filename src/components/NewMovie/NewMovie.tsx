import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const disableButton =
    !newMovie.title.trim() ||
    !newMovie.imgUrl.trim() ||
    !newMovie.imdbUrl.trim() ||
    !newMovie.imdbId.trim();

  const handleChange = (field: keyof Movie, value: string) => {
    setNewMovie(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof Movie) => {
    setNewMovie(prev => ({ ...prev, [field]: prev[field].trim() }));
  };

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      ...newMovie,
      title: newMovie.title.trim(),
      description: newMovie.description.trim(),
      imgUrl: newMovie.imgUrl.trim(),
      imdbUrl: newMovie.imdbUrl.trim(),
      imdbId: newMovie.imdbId.trim(),
    });

    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSend}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange('description', value)}
        onBlur={() => handleBlur('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
