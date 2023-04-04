import React, { useState, ChangeEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(movie: Movie): void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const trimText = (text: string) => (
    text[0] === ' ' ? text.trim() : text
  );
  const [count, setCount] = useState(0);

  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(true);
  const validator = (url: string) => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-  +=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!pattern.test(url)) {
      return false;
    }

    return true;
  };

  const [inputFields, setInputFields] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputFields({
      ...inputFields,
      [event.target.name]: trimText(event.target.value),
    });
  };

  const clearForm = () => {
    setInputFields({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const addMovie = (event: React.SyntheticEvent) => {
    const movie: Movie = {
      title: inputFields.title,
      description: inputFields.description,
      imgUrl: inputFields.imgUrl,
      imdbUrl: inputFields.imdbUrl,
      imdbId: inputFields.imdbId,
    };

    event.preventDefault();

    setIsValidImgUrl(validator(inputFields.imgUrl));
    setIsValidImdbUrl(validator(inputFields.imdbUrl));

    if (validator(inputFields.imgUrl) && validator(inputFields.imdbUrl)) {
      onAdd(movie);
      setCount(current => current + 1);

      clearForm();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputFields.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputFields.description}
        onChange={onChange}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputFields.imgUrl}
        onChange={(event) => {
          onChange(event);
          setIsValidImgUrl(true);
        }}
        required
        validation={isValidImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputFields.imdbUrl}
        onChange={(event) => {
          onChange(event);
          setIsValidImdbUrl(true);
        }}
        required
        validation={isValidImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputFields.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={(
              inputFields.title === ''
              || inputFields.imgUrl === ''
              || inputFields.imdbUrl === ''
              || inputFields.imdbId === ''
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
