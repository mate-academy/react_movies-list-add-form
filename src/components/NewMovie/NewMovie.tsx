import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../services/validation';

type Props = {
  onAdd: (movie: Movie) => void,
};

const initialFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const isFilledCorrectly = !!formData.title.trim()
                         && !!formData.imdbId.trim()
                         && isValidUrl(formData.imgUrl)
                         && isValidUrl(formData.imdbUrl);

  const handleFormDataChange = (name: string, value: string) => {
    setFormData((currentState) => ({
      ...currentState,
      [name]: value,
    }));
  };

  const reset = () => {
    setFormData(initialFormData);
    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFilledCorrectly) {
      return;
    }

    const newMovie: Movie = { ...formData };

    onAdd(newMovie);
    reset();
  };

  return (
    <form
      key={count}
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleFormDataChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleFormDataChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleFormDataChange}
        isValid={isValidUrl}
        errorMessage="Image URL is not valid URL"
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleFormDataChange}
        isValid={isValidUrl}
        errorMessage="Imdb URL is not valid URL"
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleFormDataChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFilledCorrectly}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
