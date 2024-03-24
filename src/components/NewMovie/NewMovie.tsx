import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isFormValid =
    formData.title.trim() &&
    formData.imgUrl.trim() &&
    formData.imdbUrl.trim() &&
    formData.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formData);

    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        formData={formData}
        setFormData={setFormData}
        required
      />

      <TextField
        name="description"
        label="Description"
        formData={formData}
        setFormData={setFormData}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        formData={formData}
        setFormData={setFormData}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        formData={formData}
        setFormData={setFormData}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        formData={formData}
        setFormData={setFormData}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
