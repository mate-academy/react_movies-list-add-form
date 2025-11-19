import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const INITIAL_FORM_STATE: Movie = {
  title: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  description: '',
};

export const NewMovie = ({ onAdd }: { onAdd?: (movie: Movie) => void }) => {
  const [formKey, setFormKey] = useState(0);
  const [movieData, setMovieData] = useState<Movie>(INITIAL_FORM_STATE);

  const handleChange = (fieldName: keyof Movie) => (value: string) => {
    setMovieData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const isFormValid = () => {
    return (
      movieData.title.trim() !== '' &&
      movieData.imgUrl.trim() !== '' &&
      movieData.imdbUrl.trim() !== '' &&
      movieData.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (submitEvent: React.FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const newMovie = {
      title: movieData.title.trim(),
      imgUrl: movieData.imgUrl.trim(),
      imdbUrl: movieData.imdbUrl.trim(),
      imdbId: movieData.imdbId.trim(),
      description: movieData.description.trim(),
    };

    if (onAdd) {
      onAdd(newMovie);
    }

    setMovieData(INITIAL_FORM_STATE);

    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={handleChange('imdbId')}
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
