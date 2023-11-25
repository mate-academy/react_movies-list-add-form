import React, { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../utils/utils';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  useEffect(() => {
    if (formData.title
      && formData.imgUrl
      && formData.imdbUrl
      && formData.imdbId
      && pattern.test(formData.imgUrl)
      && pattern.test(formData.imdbUrl)) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [formData]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(currentValue => currentValue + 1);
    onAdd(formData);
    resetForm();
  };

  const handleInputChange = (name: string) => (value: string) => {
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
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
        onChange={handleInputChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleInputChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleInputChange('imgUrl')}
        required
        validation
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleInputChange('imdbUrl')}
        required
        validation
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleInputChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
