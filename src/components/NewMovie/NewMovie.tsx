import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isFormValid =
    formState.title &&
    formState.imgUrl &&
    formState.imdbUrl &&
    formState.imdbId;

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setCount(n => n + 1);

    onAdd({
      title: formState.title,
      description: formState.description,
      imgUrl: formState.imgUrl,
      imdbUrl: formState.imdbUrl,
      imdbId: formState.imdbId,
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={handleInputChange}
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
