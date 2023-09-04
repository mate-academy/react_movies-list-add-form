import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [inputTitle, setTitle] = useState('');
  const [inputDescription, setDescription] = useState('');
  const [inputImageUrl, setImageUrl] = useState('');
  const [inputImdbUrl, setImdbUrl] = useState('');
  const [inputImdbId, setImdbId] = useState('');

  const [
    titleHasWhiteSpaceError,
    setTitleHasWhiteSpaceError] = useState(false);
  const [
    descriptionHasWhiteSpaceError,
    setDescriptionHasWhiteSpaceError] = useState(false);

  const isValidNoExtraWhitespace = (str: string) => (
    !/^[\s]+$/.test(str)
      && !/^\s+/.test(str)
      && !/\s{2,}/.test(str)
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const hasWhiteSpaceErrorTitle = !isValidNoExtraWhitespace(newTitle);

    setTitleHasWhiteSpaceError(hasWhiteSpaceErrorTitle);
  };

  const handleDescChange = (newDesc: string) => {
    setDescription(newDesc);
    const hasWhiteSpaceErrorDesc = !isValidNoExtraWhitespace(newDesc);

    setDescriptionHasWhiteSpaceError(hasWhiteSpaceErrorDesc);
  };

  const [isImageUrlValid, setHasValidImageUrl] = useState(false);

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|'
    + '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)'
    + '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
  );

  const isValidUrl = (url: string) => pattern.test(url);

  const handleImageUrlChange = (newUrl: string) => {
    setImageUrl(newUrl);
    const hasUrlErrorImage = !isValidUrl(newUrl);

    setHasValidImageUrl(hasUrlErrorImage);
  };

  const [isImdbUrlValid, setHasValidImdbUrl] = useState(false);

  const handleImdbUrlChange = (newImdbId: string) => {
    setImdbUrl(newImdbId);
    const hasUrlErrorImdbUrl = !isValidUrl(newImdbId);

    setHasValidImdbUrl(hasUrlErrorImdbUrl);
  };

  const [isImdbIdValid, setHasValidImdbId] = useState(false);

  const handleImdbIdChange = (newId: string) => {
    setImdbId(newId);
    const hasIdError = !/^tt\d+$/.test(newId);

    setHasValidImdbId(hasIdError);
  };

  const isFormValid
  = inputTitle.trim() !== ''
  && isValidNoExtraWhitespace(inputTitle)
  && isValidNoExtraWhitespace(inputDescription)
  && inputImageUrl.trim() !== ''
  && isValidUrl(inputImageUrl)
  && inputImdbUrl.trim() !== ''
  && isValidUrl(inputImdbUrl)
  && inputImdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovieFromForm = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImageUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    };

    onAdd(newMovieFromForm);

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputTitle}
        onChange={handleTitleChange}
        hasWhiteSpaceError={titleHasWhiteSpaceError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={handleDescChange}
        hasWhiteSpaceError={descriptionHasWhiteSpaceError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImageUrl}
        onChange={handleImageUrlChange}
        hasValidUrlError={isImageUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={handleImdbUrlChange}
        hasValidUrlError={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={handleImdbIdChange}
        hasValidImdbError={isImdbIdValid}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
