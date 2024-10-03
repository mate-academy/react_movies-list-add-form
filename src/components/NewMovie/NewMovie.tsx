import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { FormDataKeys } from '../../types/FormatDataKeys';
import { DEFAULT_MOVIE } from '../../constants/defaultMovie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(DEFAULT_MOVIE);

  let errors = { title: false, imgUrl: false, imdbUrl: false, imdbId: false };

  const handleBlur = (field: FormDataKeys) => {
    errors = {
      ...errors,
      [field]: !formData[field].trim(),
    };
  };

  const handleChange = (field: FormDataKeys, value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const resetFormAfterSubmit = () => {
    setFormData(DEFAULT_MOVIE);
    setCount(prevCount => prevCount + 1);
  };

  const isFormValid =
    formData.title.trim() &&
    formData.imdbId.trim() &&
    formData.imdbUrl.trim() &&
    formData.imgUrl.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd(formData);

    resetFormAfterSubmit();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={value => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
