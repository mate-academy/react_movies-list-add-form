import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    count: 0,
  });

  const resetForm = () => {
    setFormState(previousState => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      count: previousState.count + 1,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = formState;

    onAdd({ title, description, imgUrl, imdbUrl, imdbId });

    resetForm();
  };

  const handleInputChange = (name: string) => (value: string) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const isSubmitDisabled =
    !formState.title ||
    !formState.imgUrl ||
    !formState.imdbUrl ||
    !formState.imdbId;

  const validateUrl = (value: string) => {
    return urlPattern.test(value) ? null : 'Invalid URL';
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={formState.count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={handleInputChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={handleInputChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={handleInputChange('imgUrl')}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={handleInputChange('imdbUrl')}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={handleInputChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
