import { useState } from 'react';
import { TextField } from '../TextField';
import { Field } from '../../types/Field';

const defaultFormData = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormFields = typeof defaultFormData;

interface Props {
  onAdd: (newMovie: FormFields) => void;
}

const URL_PATTERN =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const validateUrl = (value: string) => {
  if (!value.trim()) {
    return 'Required field';
  }

  if (!URL_PATTERN.test(value)) {
    return 'Invalid URL format';
  }

  return '';
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(defaultFormData);

  function handleChange(key: keyof FormFields, value: string) {
    const copy = {
      ...formData,
      [key]: value,
    };

    setFormData(copy);
  }

  const formConfig: Field[] = [
    {
      name: 'title',
      label: 'Title',
      value: formData.title,
      onChange: (newValue: string) => handleChange('title', newValue),
      validation: value => (!value.trim() ? 'Title is required' : ''),
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      value: formData.description,
      onChange: (newValue: string) => handleChange('description', newValue),
      validation: () => '',
    },

    {
      name: 'imgUrl',
      label: 'Image URL',
      value: formData.imgUrl,
      onChange: (newValue: string) => handleChange('imgUrl', newValue),
      validation: validateUrl,
      required: true,
    },

    {
      name: 'imdbUrl',
      label: 'Imdb URL',
      value: formData.imdbUrl,
      onChange: (newValue: string) => handleChange('imdbUrl', newValue),
      validation: validateUrl,
      required: true,
    },

    {
      name: 'imdbId',
      label: 'imdbId',
      value: formData.imdbId,
      onChange: (newValue: string) => handleChange('imdbId', newValue),
      validation: value => (!value.trim() ? 'ID is required' : ''),
      required: true,
    },
  ];

  const isFormValid = formConfig.every(field => {
    return !field.validation?.(field.value);
  });

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();

        onAdd(formData);
        setFormData(defaultFormData);

        setCount(count + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      {formConfig.map(field => (
        <TextField
          key={field.name}
          {...field}
          error={field.validation?.(field.value) || ''}
        />
      ))}

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
