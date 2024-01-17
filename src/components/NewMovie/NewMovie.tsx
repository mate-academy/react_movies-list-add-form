// Import necessary libraries and components
import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  type FormKeys = keyof typeof formData;

  const handleBlur = (name: FormKeys) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: prevFormData[name].trim(),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.title
        && formData.imgUrl && formData.imdbUrl && formData.imdbId) {
      setFormData({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      setCount(count + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleInputChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formData.title
              || !formData.imgUrl || !formData.imdbUrl || !formData.imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
