import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);
  const [isImdbIdValid, setIsImdbIdValid] = useState(true);

  const valuesSetters = {
    title: setTitle,
    description: setDescription,
    imgUrl: setImgUrl,
    imdbUrl: setImdbUrl,
    imdbId: setImdbId,
  };

  const handleValueChange = (event: EventTarget & HTMLInputElement) => {
    const { name, value: newValue } = event;

    if (Object.hasOwn(valuesSetters, name)) {
      valuesSetters[name as keyof typeof valuesSetters](newValue);
    }
  };

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)' +
      '#?(?:[,.!/\\\\\\w]*))?)$',
  );
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let hasErrors = false;

    const fieldsToValidate = [
      {
        isValid: Boolean(title.trim()),
        setIsValid: setIsTitleValid,
      },
      {
        isValid: Boolean(imgUrl.trim()) && pattern.test(imgUrl),
        setIsValid: setIsImgUrlValid,
      },
      {
        isValid: Boolean(imdbUrl.trim()) && pattern.test(imdbUrl),
        setIsValid: setIsImdbUrlValid,
      },
      {
        isValid: Boolean(imdbId.trim()),
        setIsValid: setIsImdbIdValid,
      },
    ];

    fieldsToValidate.forEach(({ isValid, setIsValid }) => {
      if (!isValid) {
        hasErrors = true;
        setIsValid(false);
      }
    });

    if (hasErrors) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
  };

  const isDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => handleValueChange(event)}
        required
        isValid={isTitleValid}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => handleValueChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => handleValueChange(event)}
        required
        isValid={isImgUrlValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => handleValueChange(event)}
        required
        isValid={isImdbUrlValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => handleValueChange(event)}
        required
        isValid={isImdbIdValid}
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
