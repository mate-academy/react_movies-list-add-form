import { FC, FormEvent, useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormValues = typeof defaultValues;

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate({ imgUrl, imdbUrl }: FormValues): FormErrors {
  const errors: FormErrors = {};
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  if (!pattern.test(imgUrl)) {
    errors.imgUrl = 'Invalid image URL';
  }

  if (!pattern.test(imdbUrl)) {
    errors.imdbUrl = 'Invalid IMDB URL';
  }

  return errors;
}

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [values, setValues] = useState<FormValues>(defaultValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [count, setCount] = useState(0);

  const addNewMovie = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validate(values);

    setErrors(newErrors);

    if (Object.values(newErrors).length > 0) {
      return;
    }

    const newMovie: Movie = {
      ...values,
    };

    onAdd({ ...newMovie });
    setValues(defaultValues);
    setCount(prev => prev + 1);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof FormValues];

      return copy;
    });
  }

  useEffect(() => {
    const formValid =
      !Object.values(errors).length &&
      values.title.trim() !== '' &&
      values.imdbId.trim() !== '' &&
      values.imdbUrl.trim() !== '' &&
      values.imgUrl.trim() !== '';

    setIsFormValid(formValid);
  }, [errors, values]);

  return (
    <form className="NewMovie" key={count} onSubmit={addNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={handleChange}
        error={errors.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={handleChange}
        error={errors.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={handleChange}
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
