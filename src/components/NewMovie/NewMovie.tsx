import { FC, FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { NewMovieProps } from '../../types/NewMovieProps';

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  const handleTextFieldChange = (key: string, value: string) => {
    setFormData((oldData) => ({
      ...oldData,
      [key]: value.trimStart(),
    }));
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onAdd(formData);
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleTextFieldChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleTextFieldChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleTextFieldChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleTextFieldChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleTextFieldChange}
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
