import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleTextFieldChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const reset = () => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setTouched({
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  const handleAddClick = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = formData;

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(formData);
      reset();
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        touched={touched.title}
        onChange={(value) => handleTextFieldChange('title', value)}
        onBlur={() => setTouched({ ...touched, title: true })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        touched={touched.description}
        onChange={
          (value) => handleTextFieldChange('description', value)
        }
        onBlur={() => setTouched({ ...touched, description: true })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        touched={touched.imgUrl}
        onChange={
          (value) => handleTextFieldChange('imgUrl', value)
        }
        onBlur={() => setTouched({ ...touched, imgUrl: true })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        touched={touched.imdbUrl}
        onChange={
          (value) => handleTextFieldChange('imdbUrl', value)
        }
        onBlur={() => setTouched({ ...touched, imdbUrl: true })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        touched={touched.imdbId}
        onChange={
          (value) => handleTextFieldChange('imdbId', value)
        }
        onBlur={() => setTouched({ ...touched, imdbId: true })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="button"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddClick}
            disabled={
              !formData.title
              || !formData.imgUrl
              || !formData.imdbUrl
              || !formData.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
