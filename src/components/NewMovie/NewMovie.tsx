import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlPattern } from '../../patterns/urlPattern';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const formReset = () => {
    setFormData(initialFormData);
  };

  const handleFormDataChange = (key: string, value: string) => {
    setFormData((currentState) => ({
      ...currentState,
      [key]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formData);

    formReset();

    setCount((prevCount) => prevCount + 1);
  };

  const isAllFieldsValid = () => {
    return Boolean(formData.title.trim()
    && formData.description.trim()
    && formData.imgUrl.trim()
    && formData.imdbUrl.trim()
    && formData.imdbId.trim()
    && urlPattern.test(formData.imgUrl)
    && urlPattern.test(formData.imdbUrl));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(newValue) => handleFormDataChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(newValue) => handleFormDataChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(newValue) => handleFormDataChange('imgUrl', newValue)}
        required
        isValid={urlPattern.test(formData.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(newValue) => handleFormDataChange('imdbUrl', newValue)}
        required
        isValid={urlPattern.test(formData.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(newValue) => handleFormDataChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllFieldsValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
