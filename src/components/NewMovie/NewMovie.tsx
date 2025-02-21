import { useState } from 'react';
import { TextField } from '../TextField';

interface FormValues {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type Props = {
  onAdd: (movie: FormValues) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const validateUrl = (url: string): boolean => {
  return pattern.test(url);
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const initialFormState: FormValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState<number>(0);
  const [formValues, setFormValues] = useState<FormValues>(initialFormState);

  const handleChange = (name: string, value: string) => {
    setFormValues(currentValue => ({
      ...currentValue,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

    return requiredFields.every(
      field => formValues[field as keyof FormValues].trim() !== '',
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid()) {
      onAdd(formValues);
      setFormValues(initialFormState);
      setCount(prevCount => prevCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description || ''}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
