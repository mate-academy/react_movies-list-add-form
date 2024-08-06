import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { FormInfo, FormState } from '../../types/Form';
import {
  getValidationError,
  isAllRequiredFilled,
  minLengthValidation,
  requiredValidation,
  urlValidation,
} from '../../util/validation';

type Props = {
  onAdd: (movie: Movie) => void;
  disableByDefault?: boolean;
};

const movieFormInfo: FormInfo = {
  title: {
    label: 'Title',
    default: '',
    required: true,
    validation: [requiredValidation, minLengthValidation(3)],
  },
  description: {
    label: 'Description',
    default: '',
  },
  imgUrl: {
    label: 'Image URL',
    default: '',
    required: true,
    validation: [requiredValidation, urlValidation],
  },
  imdbUrl: {
    label: 'Imdb URL',
    default: '',
    required: true,
    validation: [requiredValidation, urlValidation],
  },
  imdbId: {
    label: 'Imdb ID',
    required: true,
    validation: [requiredValidation],
  },
};

type MovieForm = keyof typeof movieFormInfo;

const defaultForm = Object.fromEntries(
  Object.entries(movieFormInfo).map(([fieldName, field]) => [
    fieldName,
    { value: field.default || '' },
  ]),
);

export const NewMovie: React.FC<Props> = ({
  onAdd,
  disableByDefault = true,
}) => {
  const [form, setForm] = useState<FormState<MovieForm>>(defaultForm);
  const [count, setCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  let isFormValid =
    !Object.values(form).some(value => !!value.error) &&
    (!disableByDefault || isAllRequiredFilled<MovieForm>(form, movieFormInfo));

  const handleChange = (fieldName: string, value: string) => {
    const error = getValidationError(movieFormInfo[fieldName], value);

    if (error) {
      isFormValid = false;
    }

    setForm(currentValues => ({
      ...currentValues,
      [fieldName]: {
        value,
        error,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);
    isFormValid = true;

    Object.entries(form).forEach(([fieldName, field]) => {
      handleChange(fieldName, field.value);
    });

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: form.title?.value,
      description: form.description?.value,
      imgUrl: form.imgUrl?.value,
      imdbUrl: form.imdbUrl?.value,
      imdbId: form.imdbId?.value,
    };

    onAdd(newMovie);
    setForm(defaultForm);
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      {Object.entries(movieFormInfo).map(([fieldName, field]) => (
        <TextField
          name={fieldName}
          label={field.label}
          value={form[fieldName]?.value || ''}
          error={form[fieldName]?.error}
          showError={submitted}
          onChange={newValue => handleChange(fieldName, newValue)}
          key={fieldName}
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
