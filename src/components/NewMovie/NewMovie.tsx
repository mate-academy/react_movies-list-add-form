import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { validateField } from '../../services/validateField';
import { objValuesAudit } from '../../services/objValuesAudit';

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
  const fieldNames = Object.keys(formData);

  const initialAudit: Record<string, {
    request: boolean;
    valid: boolean;
  }> = {
    title: {
      request: false,
      valid: false,
    },
  };

  fieldNames.forEach((key) => {
    initialAudit[key] = {
      request: false,
      valid: false,
    };
  });

  const defaultTouched = objValuesAudit(initialAudit, 'request');
  const defaultValid = objValuesAudit(initialAudit, 'valid');

  const [touched, setTouched] = useState(defaultTouched);

  const [fieldValid, setFieldValid] = useState(defaultValid);

  const handleTextFieldChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (value: string, name: string) => {
    if (!value.length) {
      setTouched({ ...touched, [name]: true });
    } else if (name !== 'description') {
      validateField(
        name,
        value,
        setFieldValid,
      );
    }
  };

  const reset = () => {
    setFormData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setTouched(defaultTouched);
    setFieldValid(defaultValid);
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

  const isButtonDisabled = !formData.title
  || !formData.imgUrl
    || !formData.imdbUrl
    || !formData.imdbId
    || fieldValid.title
    || fieldValid.imgUrl
    || fieldValid.imdbUrl
    || fieldValid.imdbId;

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formData.title}
        touched={touched.title}
        valid={fieldValid.title}
        onChange={(value, name) => {
          handleTextFieldChange(name, value);
        }}
        onBlur={(value) => handleBlur(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formData.description}
        touched={touched.description}
        valid={fieldValid.description}
        onChange={(value, name) => {
          handleTextFieldChange(name, value);
        }}
        onBlur={(value) => handleBlur(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formData.imgUrl}
        touched={touched.imgUrl}
        valid={fieldValid.imgUrl}
        onChange={(value, name) => {
          handleTextFieldChange(name, value);
        }}
        onBlur={(value) => handleBlur(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formData.imdbUrl}
        touched={touched.imdbUrl}
        valid={fieldValid.imdbUrl}
        onChange={(value, name) => {
          handleTextFieldChange(name, value);
        }}
        onBlur={(value) => handleBlur(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formData.imdbId}
        touched={touched.imdbId}
        valid={fieldValid.imdbId}
        onChange={(value, name) => {
          handleTextFieldChange(name, value);
        }}
        onBlur={(value) => handleBlur(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="button"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddClick}
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
