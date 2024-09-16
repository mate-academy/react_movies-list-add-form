import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

type FormValuesValid = Record<keyof Movie, boolean>;

const FORM_DEFAULT_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const IS_VALID_LINK =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [submitionCount, setSubmitionCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>(FORM_DEFAULT_VALUES);
  const [formValuesValid, setFormValuesValid] = useState<FormValuesValid>({
    description: true,
    imdbId: true,
    imdbUrl: true,
    imgUrl: true,
    title: true,
  });

  const isEachFormValueValid = Object.values(formValuesValid).every(
    formValueValid => formValueValid,
  );

  const createSetIsValid = (name: keyof Movie) => (isValid: boolean) => {
    setFormValuesValid(currentFormErrors => ({
      ...currentFormErrors,
      [name]: isValid,
    }));
  };

  const createHandleChange = (name: keyof Movie) => (value: string) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEachFormValueValid) {
      return;
    }

    onAdd(formValues);
    setSubmitionCount(currentSubmitionCount => currentSubmitionCount + 1);
    setFormValues(FORM_DEFAULT_VALUES);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={submitionCount}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        setIsValid={createSetIsValid('title')}
        validationCallback={v => v.checkEdgeSpaces().checkLength(1)}
        value={formValues.title}
        onChange={createHandleChange('title')}
      />

      <TextField
        name="description"
        label="Description"
        setIsValid={createSetIsValid('description')}
        validationCallback={v => v.checkEdgeSpaces()}
        value={formValues.description}
        onChange={createHandleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        setIsValid={createSetIsValid('imgUrl')}
        validationCallback={v =>
          v.checkEdgeSpaces().checkLength(1).checkMatch(IS_VALID_LINK)
        }
        value={formValues.imgUrl}
        onChange={createHandleChange('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        setIsValid={createSetIsValid('imdbUrl')}
        validationCallback={v =>
          v.checkEdgeSpaces().checkLength(1).checkMatch(IS_VALID_LINK)
        }
        value={formValues.imdbUrl}
        onChange={createHandleChange('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        setIsValid={createSetIsValid('imdbId')}
        validationCallback={v => v.checkEdgeSpaces().checkLength(1)}
        value={formValues.imdbId}
        onChange={createHandleChange('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isEachFormValueValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
