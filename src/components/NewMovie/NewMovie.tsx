import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (data: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [hasTitleError, setTitleError] = useState(true);
  // const [hasDescriptionError, setDescriptionError] = useState(true);
  const [hasImgUrlError, setImgUrlError] = useState(true);
  const [hasImdbUrlError, setImdbUrlError] = useState(true);
  const [hasImdbIdError, setImdbIdError] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    setTitleError(!newValue.trim());
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
    // setDescriptionError(!newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setImgUrlError(!newValue.trim());
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setImdbUrlError(!newValue.trim());
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
    setImdbIdError(!newValue.trim());
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');

    setTitleError(false);
    // setDescriptionError(true);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);
  };

  const urlValidation = (value: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(value);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title || !imdbUrl || !imgUrl || !imdbId) {
      return;
    }

    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  }

  return (
    <form className="NewMovie" key={count} noValidate onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        validate={urlValidation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        validate={urlValidation}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              // hasDescriptionError ||
              hasImdbIdError ||
              hasImdbUrlError ||
              hasImgUrlError ||
              hasTitleError
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
