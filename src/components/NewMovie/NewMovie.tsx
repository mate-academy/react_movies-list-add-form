import { FC, useState } from 'react';

import { TextField } from '../TextField';

import { INITIAL_FORM, URL_PATTERN } from '../../constants';

import { getFields } from '../../helpers/getTextField';

import { INewMovie } from '../../types/NewMovie.types';

export const NewMovie: FC<INewMovie> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [form, setForm] = useState(INITIAL_FORM);

  const { title, imgUrl, imdbId, imdbUrl } = form;

  const fields = getFields(form);

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm(prevForm => ({ ...prevForm, [name]: value.trimStart() }));
  };

  const showButton = () => {
    if (
      !title ||
      !imgUrl ||
      !imdbId ||
      !imdbUrl ||
      !imgUrl.match(URL_PATTERN) ||
      !imdbUrl.match(URL_PATTERN)
    ) {
      return true;
    }

    return false;
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd(form);

    setForm(INITIAL_FORM);

    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitForm}>
      <h2 className="title">Add a movie</h2>
      {fields.map(field => (
        <TextField key={field.name} {...field} onChange={updateForm} />
      ))}
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={showButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
