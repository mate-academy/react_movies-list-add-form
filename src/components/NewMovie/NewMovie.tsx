import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const REQUIRED_FIELDS: (keyof Movie)[] = [
  'title',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

const defaultValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [values, setValues] = useState<Movie>(defaultValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const isFormValid = (formValues: Movie): boolean => {
    return REQUIRED_FIELDS.every(field => {
      const value = formValues[field].trim();

      return value.length > 0;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid(values)) {
      return;
    }

    onAdd(values);
    setCount(p => p + 1);
    setValues(defaultValues);
  };

  const fields: { name: keyof Movie; required?: boolean }[] = [
    { name: 'title', required: true },
    { name: 'description' },
    { name: 'imgUrl', required: true },
    { name: 'imdbUrl', required: true },
    { name: 'imdbId', required: true },
  ];

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(({ name, required }) => (
        <TextField
          key={name}
          name={name}
          label={name[0].toUpperCase() + name.slice(1)}
          value={values[name]}
          onChange={handleChange}
          required={required}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid(values)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
