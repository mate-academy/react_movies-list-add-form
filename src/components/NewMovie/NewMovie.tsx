import { ChangeEvent, FormEventHandler, useState } from 'react';

import { TextField } from '../TextField';
import { checkIfUrl, getRandomDigits, prepareLabel } from '../../utils/helper';

import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const initialFormValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [count, setCount] = useState(0);

  const {
    title, imdbId, imdbUrl, imgUrl,
  } = formValues;

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    onAdd(formValues);

    setFormValues(initialFormValues);
    setCount((prevState) => prevState + 1);
  };

  const isDisabled = !title
    || !imdbId
    || !imdbUrl
    || !imgUrl
    || !checkIfUrl(imdbUrl)
    || !checkIfUrl(imdbUrl);

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
      <h2 className="title">Add a movie</h2>

      {
        Object.keys(initialFormValues).map(input => {
          const label = prepareLabel(input);
          const isRequired = input !== 'description';

          return (
            <TextField
              key={input}
              id={`${input}-${getRandomDigits()}`}
              name={input}
              label={label}
              placeholder={`Enter ${label}`}
              value={formValues[input as keyof Movie]}
              onChange={onChange}
              required={isRequired}
            />
          );
        })
      }
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
