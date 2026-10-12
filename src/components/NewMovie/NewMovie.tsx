import { useState, type FormEvent } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

type MovieField = keyof Movie;

const URL_PATTERN =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const EMPTY_FIELDS: Record<MovieField, string> = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const REQUIRED_FIELDS: MovieField[] = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

const isUrlValid = (value: string) => URL_PATTERN.test(value);

export const NewMovie = ({ onAdd }: Props) => {
  // The key remounts the form after each successful submission,
  // so the `touched` state of every `TextField` is reset
  const [formKey, setFormKey] = useState(0);
  const [fields, setFields] = useState(EMPTY_FIELDS);

  const isFormFilled = REQUIRED_FIELDS.every(
    field => fields[field].trim() !== '',
  );

  const setFieldValue = (field: MovieField) => (newValue: string) => {
    setFields(currentFields => ({
      ...currentFields,
      [field]: newValue,
    }));
  };

  const resetForm = () => {
    setFields(EMPTY_FIELDS);
    setFormKey(currentKey => currentKey + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormFilled) {
      return;
    }

    const newMovie = {
      title: fields.title.trim(),
      description: fields.description.trim(),
      imgUrl: fields.imgUrl.trim(),
      imdbUrl: fields.imdbUrl.trim(),
      imdbId: fields.imdbId.trim(),
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fields.title}
        onChange={setFieldValue('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fields.description}
        onChange={setFieldValue('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fields.imgUrl}
        onChange={setFieldValue('imgUrl')}
        validate={isUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fields.imdbUrl}
        onChange={setFieldValue('imdbUrl')}
        validate={isUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fields.imdbId}
        onChange={setFieldValue('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
