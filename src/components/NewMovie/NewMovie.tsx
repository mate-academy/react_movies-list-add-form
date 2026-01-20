import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
const clear = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [values, setValues] = useState<Movie>({ ...clear });

  const handleChange = (field: keyof Movie, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    values.title.trim() &&
    values.imgUrl.trim() &&
    values.imdbUrl.trim() &&
    values.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title: values.title.trim(),
      description: values.description.trim(),
      imgUrl: values.imgUrl.trim(),
      imdbUrl: values.imdbUrl.trim(),
      imdbId: values.imdbId.trim(),
    });

    setValues({ ...clear });

    setFormKey(prev => prev + 1); 
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={val => handleChange('title', val)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={val => handleChange('description', val)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={val => handleChange('imgUrl', val)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={val => handleChange('imdbUrl', val)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={val => handleChange('imdbId', val)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
