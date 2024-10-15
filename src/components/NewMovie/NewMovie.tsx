import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const defaultValues = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type FormValues = typeof defaultValues;
type Props = {
  onAdd: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<FormValues>(defaultValues);

  const isDisabled = Object.keys(newMovie)
    .filter(key => key !== 'description')
    .some(key => {
      const typedKey = key as keyof typeof newMovie;

      return !newMovie[typedKey] || !newMovie[typedKey].trim();
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie(currentValues => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(newMovie);
    setNewMovie(defaultValues);
    setCount(preventCount => preventCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleOnSubmit}>
      <h2 className="title">Add a movie</h2>

      {Object.keys(defaultValues).map(input => (
        <TextField
          key={`${input} - ${count}`}
          name={input}
          label={input[0].toUpperCase() + input.slice(1)}
          value={newMovie[input as keyof FormValues]}
          onChange={event => handleChange(event)}
          required={input !== 'description'}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
