import { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
};


export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initialState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [touchedFields, setTouchedFields] = useState({});
  const [key, setKey] = useState(0);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (name: string) => {
    setTouchedFields({ ...touchedFields, [name]: true });
  };

  const isValid = () => {
    return (
      formData.title.trim() &&
      formData.imgUrl.trim() &&
      formData.imdbUrl.trim() &&
      formData.imdbId.trim()
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid()) return;

    onAdd({ ...formData });
    setFormData(initialState);
    setTouchedFields({});
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <form className="NewMovie" key={key} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={(value) => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
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
        value={formData.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
