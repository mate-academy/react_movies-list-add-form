import React, { useState } from 'react';
import { TextField } from '../TextField';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import classNames from 'classnames';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}
interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [titleError, setTitleError] = React.useState('');
  const [imgUrlError, setImgUrlError] = React.useState('');
  const [imdbUrlError, setImdbUrlError] = React.useState('');
  const [imdbIdError, setImdbIdError] = React.useState('');

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const isValid =
    title.trim().length > 0 &&
    imgUrl.trim().length > 0 &&
    imdbUrl.trim().length > 0 &&
    imdbId.trim().length > 0;
  const urlPattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)$',
  );

  function validateTitle(value: string) {
    if (!value.trim()) {
      return 'Title is required';
    }

    return '';
  }

  function validateUrl(value: string) {
    if (!value.trim()) {
      return 'Url is required';
    }

    if (!urlPattern.test(value.trim())) {
      return 'Please enter a valid URL';
    }

    return '';
  }

  function validateImdbId(value: string) {
    if (!value.trim()) {
      return 'Imdb ID is required';
    }

    return '';
  }

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    setTitleError('');
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setImgUrlError('');
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setImdbUrlError('');
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
    setImdbIdError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const titleErrorValue = validateTitle(title);
    const imgUrlErrorValue = validateUrl(imgUrl);
    const imdbUrlErrorValue = validateUrl(imdbUrl);
    const imdbIdErrorValue = validateImdbId(imdbId);

    setImdbUrlError(imdbUrlErrorValue);
    setImdbIdError(imdbIdErrorValue);

    setTitleError(titleErrorValue);
    setImgUrlError(imgUrlErrorValue);

    if (
      titleErrorValue ||
      imgUrlErrorValue ||
      imdbUrlErrorValue ||
      imdbIdErrorValue
    ) {
      return;
    }

    // Call the onAdd prop with the new movie data
    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    alert('Movie added!');
    // Clear the form
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitleError('');
    setImgUrlError('');
    setImdbUrlError('');
    setImdbIdError('');
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      <TextField
        className={classNames('input', { 'is-danger': titleError })}
        placeholder="Enter Title"
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        onBlur={() => setTitleError(validateTitle(title))}
        required
      />

      <TextField
        className="input"
        name="description"
        label="Description"
        placeholder="Enter Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        className={classNames('input', { 'is-danger': imgUrlError })}
        label="Image URL"
        name="imgUrl"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
        onBlur={() => setImgUrlError(validateUrl(imgUrl))}
      />

      <TextField
        className={classNames('input', { 'is-danger': imdbUrlError })}
        placeholder="Enter Imdb URL"
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
        onBlur={() => setImdbUrlError(validateUrl(imdbUrl))}
      />

      <TextField
        className={classNames('input', { 'is-danger': imdbIdError })}
        placeholder="Enter Imdb ID"
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
        onBlur={() => setImdbIdError(validateImdbId(imdbId))}
      />

      {titleError && <p className="help is-danger">{titleError}</p>}
      {imgUrlError && <p className="help is-danger">{imgUrlError}</p>}
      {imdbUrlError && <p className="help is-danger">{imdbUrlError}</p>}
      {imdbIdError && <p className="help is-danger">{imdbIdError}</p>}

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isValid}
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
