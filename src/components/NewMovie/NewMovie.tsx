import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { useValidator } from '../../hooks/useValidator';

const FORM_DEFAULT_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd(movie: Movie): void;
};

const IS_VALID_LINK =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [submitionCount, setSubmitionCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>(FORM_DEFAULT_VALUES);

  const isTitleValid = useValidator(formValues.title, v =>
    v.checkEdgeSpaces().checkLength(1),
  );

  const isDescriptionValid = useValidator(formValues.description, v =>
    v.checkEdgeSpaces(),
  );

  const isImdbIdValid = useValidator(formValues.imdbId, v =>
    v.checkEdgeSpaces().checkLength(1),
  );
  const isImdbUrlValid = useValidator(formValues.imdbUrl, v =>
    v.checkEdgeSpaces().checkLength(1).checkMatch(IS_VALID_LINK),
  );

  const isImgUrlValid = useValidator(formValues.imgUrl, v =>
    v.checkEdgeSpaces().checkLength(1).checkMatch(IS_VALID_LINK),
  );

  const isEachFormValueValid =
    isImgUrlValid &&
    isImdbUrlValid &&
    isImdbIdValid &&
    isDescriptionValid &&
    isTitleValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEachFormValueValid) {
      return;
    }

    onAdd(formValues);
    setSubmitionCount(currentSubmitionCount => currentSubmitionCount + 1);
    setFormValues(FORM_DEFAULT_VALUES);
  };

  const handleChange = (value: string, name: string) => {
    setFormValues(currentFormValues => ({
      ...currentFormValues,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={submitionCount}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        hasError={!isTitleValid}
        value={formValues.title}
        onChange={value => handleChange(value, 'title')}
      />

      <TextField
        name="description"
        label="Description"
        hasError={!isDescriptionValid}
        value={formValues.description}
        onChange={value => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        hasError={!isImgUrlValid}
        value={formValues.imgUrl}
        onChange={value => handleChange(value, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        hasError={!isImdbUrlValid}
        value={formValues.imdbUrl}
        onChange={value => handleChange(value, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        hasError={!isImdbIdValid}
        value={formValues.imdbId}
        onChange={value => handleChange(value, 'imdbId')}
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
