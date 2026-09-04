// src/components/NewMovie/NewMovie.tsx
import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Omit<Movie, 'id'>) => void;
};

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);

    return true;
  } catch {
    return false;
  }
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Form key for reinitialization after submission
  const [formKey, setFormKey] = useState(0);

  // Track which fields have been validated
  const [touchedFields, setTouchedFields] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  // Custom error messages for fields
  const [fieldErrors, setFieldErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // Check if all required fields are filled (trimmed)
  const isFormValid = () => {
    return (
      title.trim() !== '' &&
      imgUrl.trim() !== '' &&
      imdbUrl.trim() !== '' &&
      imdbId.trim() !== '' &&
      !fieldErrors.title &&
      !fieldErrors.imgUrl &&
      !fieldErrors.imdbUrl &&
      !fieldErrors.imdbId
    );
  };

  // Validate a single field
  const validateField = (fieldName: string, fieldValue: string): string => {
    const trimmedValue = fieldValue.trim();

    switch (fieldName) {
      case 'title':
        if (trimmedValue === '') {
          return 'Title is required';
        }

        return '';
      case 'imgUrl':
        if (trimmedValue === '') {
          return 'Image URL is required';
        }

        if (!isValidUrl(trimmedValue)) {
          return 'Please enter a valid URL';
        }

        return '';
      case 'imdbUrl':
        if (trimmedValue === '') {
          return 'IMDB URL is required';
        }

        if (!isValidUrl(trimmedValue)) {
          return 'Please enter a valid URL';
        }

        return '';
      case 'imdbId':
        if (trimmedValue === '') {
          return 'IMDB ID is required';
        }

        return '';
      default:
        return '';
    }
  };

  // Handle field change
  const handleFieldChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'imgUrl':
        setImgUrl(value);
        break;
      case 'imdbUrl':
        setImdbUrl(value);
        break;
      case 'imdbId':
        setImdbId(value);
        break;
    }

    // Validate on change if field was touched
    if (touchedFields[fieldName as keyof typeof touchedFields]) {
      const error = validateField(fieldName, value);

      setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  // Handle validation when TextField's internal onBlur triggers
  // We need to check if the field is empty after blur
  useEffect(() => {
    // Check each field that has been touched but not validated
    Object.keys(touchedFields).forEach(fieldName => {
      if (touchedFields[fieldName as keyof typeof touchedFields]) {
        let value = '';

        switch (fieldName) {
          case 'title':
            value = title;
            break;
          case 'imgUrl':
            value = imgUrl;
            break;
          case 'imdbUrl':
            value = imdbUrl;
            break;
          case 'imdbId':
            value = imdbId;
            break;
          default:
            return;
        }

        const error = validateField(fieldName, value);

        setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
      }
    });
  }, [title, imgUrl, imdbUrl, imdbId, touchedFields]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Mark all required fields as touched
    setTouchedFields({
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    });

    // Validate all required fields
    const newErrors = {
      title: validateField('title', title),
      imgUrl: validateField('imgUrl', imgUrl),
      imdbUrl: validateField('imdbUrl', imdbUrl),
      imdbId: validateField('imdbId', imdbId),
    };

    setFieldErrors(newErrors);

    // Check if there are any errors
    if (
      newErrors.title ||
      newErrors.imgUrl ||
      newErrors.imdbUrl ||
      newErrors.imdbId
    ) {
      return;
    }

    // Add the new movie
    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    // Clear the form after adding
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // Reset errors and touched state
    setFieldErrors({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setTouchedFields({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });

    // Reinitialize form to hide errors
    setFormKey(prev => prev + 1);
  };

  // Helper to mark field as touched (called from TextField's onChange)
  const markFieldAsTouched = (fieldName: string) => {
    if (!touchedFields[fieldName as keyof typeof touchedFields]) {
      setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
      // Validate immediately when field is first touched
      let value = '';

      switch (fieldName) {
        case 'title':
          value = title;
          break;
        case 'imgUrl':
          value = imgUrl;
          break;
        case 'imdbUrl':
          value = imdbUrl;
          break;
        case 'imdbId':
          value = imdbId;
          break;
        default:
          return;
      }

      const error = validateField(fieldName, value);

      setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <div className="field-wrapper">
        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={value => {
            handleFieldChange('title', value);
            markFieldAsTouched('title');
          }}
          required
        />
        {touchedFields.title && fieldErrors.title && (
          <p className="help is-danger">{fieldErrors.title}</p>
        )}
      </div>

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleFieldChange('description', value)}
      />

      <div className="field-wrapper">
        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          onChange={value => {
            handleFieldChange('imgUrl', value);
            markFieldAsTouched('imgUrl');
          }}
          required
        />
        {touchedFields.imgUrl && fieldErrors.imgUrl && (
          <p className="help is-danger">{fieldErrors.imgUrl}</p>
        )}
      </div>

      <div className="field-wrapper">
        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          onChange={value => {
            handleFieldChange('imdbUrl', value);
            markFieldAsTouched('imdbUrl');
          }}
          required
        />
        {touchedFields.imdbUrl && fieldErrors.imdbUrl && (
          <p className="help is-danger">{fieldErrors.imdbUrl}</p>
        )}
      </div>

      <div className="field-wrapper">
        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          onChange={value => {
            handleFieldChange('imdbId', value);
            markFieldAsTouched('imdbId');
          }}
          required
        />
        {touchedFields.imdbId && fieldErrors.imdbId && (
          <p className="help is-danger">{fieldErrors.imdbId}</p>
        )}
      </div>

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
