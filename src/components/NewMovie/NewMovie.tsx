import React, { useState } from 'react';
import { TextField } from '../TextField';

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type NewMovieProps = {
  onAdd: (movie: {
    title: string;
    description?: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [key, setKey] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const isFieldValid = (field: string) => {
    const value = formValues[field];

    if (field === 'imgUrl' || field === 'imdbUrl') {
      return urlPattern.test(value.trim());
    }

    return value.trim() !== '';
  };

  const isFormValid = () =>
    ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(field =>
      isFieldValid(field),
    );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }

    onAdd(formValues);

    // Reset form state
    setFormValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setTouched({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });

    // Reset form key to reinitialize fields
    setKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={key} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={value => handleInputChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        onChange={value => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
        validationCallback={value => urlPattern.test(value)}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={formValues.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
        validationCallback={value => urlPattern.test(value)}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={formValues.imdbId}
        onChange={value => handleInputChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
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
