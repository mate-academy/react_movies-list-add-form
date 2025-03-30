import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export type FormErrors = Partial<Record<keyof Movie, string>>;

const validate = (values: Movie): FormErrors => {
  const pattern =
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/; // eslint-disable-line max-len

  const { title, imgUrl, imdbUrl, imdbId } = values;
  const errors: FormErrors = {};

  if (!title) {
    errors.title = 'Title is required';
  }

  if (!imgUrl) {
    errors.imgUrl = 'Image URL is required';
  }

  if (!errors.imgUrl && !pattern.test(imgUrl)) {
    errors.imgUrl = 'ImgUrl must be a link';
  }

  if (!imdbUrl) {
    errors.imdbUrl = 'Imdb URL is required';
  }

  if (!errors.imdbUrl && !pattern.test(imdbUrl)) {
    errors.imdbUrl = 'ImdbUrl must be a link';
  }

  if (!imdbId) {
    errors.imdbId = 'Imdb ID is required';
  }

  return errors;
};

const defaultValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [values, setValues] = useState(defaultValues);
  const [, setErrors] = useState<FormErrors>({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const updatedValues = {
      ...values,
      [name]: value,
    };

    setValues(updatedValues);

    setErrors(currentErrors => {
      const copy = { ...currentErrors };

      delete copy[name as keyof Movie];

      return copy;
    });

    const newError = validate(updatedValues);

    if (Object.keys(newError).length > 0) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = values;

    const newErrors = validate(values);

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });
    setValues(defaultValues);
    setFormKey(prevKey => prevKey + 1);
    setIsButtonDisabled(true);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={values.title}
        onChange={handlerChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={handlerChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={handlerChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={handlerChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={handlerChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
