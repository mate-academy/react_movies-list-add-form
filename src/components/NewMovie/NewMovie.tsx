import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

interface DefaultValues {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export interface Values {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface DefaultErrors {
  title: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
}

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie = ({
  onAdd,
}: {
  onAdd: (movie: DefaultValues) => void;
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const defaultValues: DefaultValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const defaultErrors: DefaultErrors = {
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  };

  const [values, setValue] = useState(defaultValues);
  const [errors, setErrors] = useState(defaultErrors);

  useEffect(() => {
    setErrors({
      title: values.title.trim() === '',
      imgUrl: values.imgUrl.trim() === '' || !pattern.test(values.imgUrl),
      imdbUrl: values.imdbUrl.trim() === '' || !pattern.test(values.imdbUrl),
      imdbId: values.imdbId.trim() === '',
    });
  }, [values]);

  const isDisabled = Object.values(errors).some(error => error);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        e.preventDefault();
        if (isDisabled) {
          return;
        }

        setCount(prev => prev + 1);
        onAdd(values);
        setValue(defaultValues);
        setErrors(defaultErrors);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={values.title}
        label="Title"
        onChange={(newTitle: string) => {
          setValue({
            ...values,
            title: newTitle,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={values.description}
        onChange={(newDescription: string) => {
          setValue(prev => ({
            ...prev,
            description: newDescription,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={values.imgUrl}
        onChange={(newImgUrl: string) => {
          setValue(prev => ({
            ...prev,
            imgUrl: newImgUrl,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={values.imdbUrl}
        onChange={(newImdbURL: string) => {
          setValue(prev => ({
            ...prev,
            imdbUrl: newImdbURL,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={values.imdbId}
        onChange={(newImdbId: string) => {
          setValue(prev => ({
            ...prev,
            imdbId: newImdbId,
          }));
        }}
        required
      />

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
