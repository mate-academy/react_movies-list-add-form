import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

function useForm(initialState: Record<string, string>) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return { formData, handleChange };
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const { formData, handleChange } = useForm({
    title: '',
    description: '',
    imgUrl: '',
    imdbId: '',
    imdbUrl: '',
  });

  const isButtonDisabled
  = !formData.title.trim()
  || !formData.imgUrl.trim()
  || !formData.imdbId.trim()
  || !formData.imdbUrl.trim();

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pattern.test(formData.imdbUrl) || !pattern.test(formData.imgUrl)) {
      return;
    }

    const movie: Movie = {
      title: formData.title,
      description: formData.description,
      imgUrl: formData.imgUrl,
      imdbId: formData.imdbId,
      imdbUrl: formData.imdbUrl,
    };

    onAdd(movie);

    handleChange('title', '');
    handleChange('description', '');
    handleChange('imgUrl', '');
    handleChange('imdbId', '');
    handleChange('imdbUrl', '');
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        pattern={pattern}
        value={formData.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        pattern={pattern}
        value={formData.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
