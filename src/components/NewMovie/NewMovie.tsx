import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie :Movie) => void;
}

const initialFormValues = {
  title: '',
  imdbUrl: '',
  imgUrl: '',
  imdbId: '',
  description: '',
};

export const NewMovie:FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleChange = (fieldName: string, text: string) => {
    setFormValues((current) => ({
      ...current,
      [fieldName]: text,
    }));
  };

  const isAllRequiredFilled = () => {
    const {
      title,
      imdbUrl,
      imgUrl,
      imdbId,
    } = formValues;
    const fields = [title, imdbUrl, imgUrl, imdbId];

    return fields.every(field => field.trim());
  };

  const clearForm = () => {
    setFormValues(initialFormValues);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    clearForm();
    setCount((currentCount) => currentCount + 1);

    onAdd(formValues);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e) => handleSubmitForm(e)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={(text) => handleChange('title', text)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={(text) => handleChange('description', text)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={(text) => handleChange('imgUrl', text)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={(text) => handleChange('imdbUrl', text)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={(text) => handleChange('imdbId', text)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllRequiredFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
