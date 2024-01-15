import React, { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie: React.FC = () => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setTitleError(false);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);

    setIsFormSubmitted(false);
    setCount(prevCount => prevCount + 1);
  };

  const validateUrl = (url: string): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)?(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setImgUrlError(!imgUrl.trim());
    setImdbUrlError(!imdbUrl.trim());
    setImdbIdError(!imdbId.trim());

    if (title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()) {
      if (!validateUrl(imgUrl)) {
        setImgUrlError(true);
        setIsFormSubmitted(true);

        return;
      }

      if (!validateUrl(imdbUrl)) {
        setImdbUrlError(true);
        setIsFormSubmitted(true);

        return;
      }

      resetForm();
    }

    setIsFormSubmitted(true);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => setTitle(newValue)}
        required
        error={titleError ? 'Title is required' : undefined}
        onBlur={() => setIsFormSubmitted(true)}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => setImgUrl(newValue)}
        onBlur={() => setImgUrlError(!imgUrl.trim())}
        required
        showError={isFormSubmitted}
        error={
          (imgUrlError && 'Image URL is required')
          || (isFormSubmitted && !validateUrl(imgUrl) && 'Invalid Image URL')
          || undefined
        }
      />

      <TextField
        name="imdbUrl"
        label="IMDb URL"
        value={imdbUrl}
        onChange={(newValue) => setImdbUrl(newValue)}
        onBlur={() => setImdbUrlError(!imdbUrl.trim())}
        required
        showError={isFormSubmitted}
        error={
          (imdbUrlError && 'IMDb URL is required')
          || (isFormSubmitted && !validateUrl(imdbUrl) && 'Invalid IMDb URL')
          || undefined
        }
      />

      <TextField
        name="imdbId"
        label="IMDb ID"
        value={imdbId}
        onChange={(newValue) => setImdbId(newValue)}
        onBlur={() => setImdbIdError(!imdbId.trim())}
        required
        showError={isFormSubmitted}
        error={imdbIdError ? 'IMDb ID is required' : undefined}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim()
              || !imgUrl.trim()
              || !imdbUrl.trim()
              || !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
