import React, { memo, useCallback, useState } from 'react';
import { FormInput } from '../FormInput/FormInput';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const clearForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }, []);

  const shouldFormSubmit = [title, description, imgUrl, imdbUrl, imdbId]
    .filter(field => field).length;

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!description) {
      setDescriptionError(true);
    }

    if (!imgUrl) {
      setImgUrlError(true);
    }

    if (!imdbUrl) {
      setImdbUrlError(true);
    }

    if (!imdbId) {
      setImdbIdError(true);
    }

    if (!shouldFormSubmit) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clearForm();
  };

  return (
    <form onSubmit={formSubmit}>
      <FormInput
        value={title}
        placeholder="Enter title"
        onInput={setTitle}
        error={titleError}
        onError={setTitleError}
      />
      <FormInput
        value={description}
        placeholder="Enter description"
        onInput={setDescription}
        error={descriptionError}
        onError={setDescriptionError}
      />
      <FormInput
        value={imgUrl}
        placeholder="Pass movie imgUrl"
        onInput={setImgUrl}
        error={imgUrlError}
        onError={setImgUrlError}
      />
      <FormInput
        value={imdbUrl}
        placeholder="Pass movie imdbUrl"
        onInput={setImdbUrl}
        error={imdbUrlError}
        onError={setImdbUrlError}
      />
      <FormInput
        value={imdbId}
        placeholder="Pass movie imdbId"
        onInput={setImdbId}
        error={imdbIdError}
        onError={setImdbIdError}
      />

      <button type="submit">Add movie</button>
    </form>
  );
});
