import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formData, setformData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: string) => (value: string) => {
    setformData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(key =>
    formData[key].trim(),
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd({
      title: formData.title.trim(),
      description: formData.description.trim(),
      imgUrl: formData.imgUrl.trim(),
      imdbUrl: formData.imdbUrl.trim(),
      imdbId: formData.imdbId.trim(),
    });

    setformData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        onChange={handleChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
