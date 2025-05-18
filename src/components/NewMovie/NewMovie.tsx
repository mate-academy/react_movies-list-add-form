import React, { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const [description, setDescription] = useState('');

  const [formKey, setFormKey] = useState(0);

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    setHasTitleError(false);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setHasImgUrlError(false);
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setHasImdbUrlError(false);
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
    setHasImdbIdError(false);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleTitleBlur = () => {
    setHasTitleError(title.trim() === '');
  };

  const handleImgUrlBlur = () => {
    setHasImgUrlError(imgUrl.trim() === '');
  };

  const handleImdbUrlBlur = () => {
    setHasImdbUrlError(imdbUrl.trim() === '');
  };

  const handleImdbIdBlur = () => {
    setHasImdbIdError(imdbId.trim() === '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleError = title.trim() === '';
    const imgUrlError = imgUrl.trim() === '';
    const imdbUrlError = imdbUrl.trim() === '';
    const imdbIdError = imdbId.trim() === '';

    setHasTitleError(titleError);
    setHasImgUrlError(imgUrlError);
    setHasImdbUrlError(imdbUrlError);
    setHasImdbIdError(imdbIdError);

    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      return;
    }

    setFormKey(prev => prev + 1);
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        required
        error={hasTitleError}
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
        onBlur={handleImgUrlBlur}
        required
        error={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        onBlur={handleImdbUrlBlur}
        required
        error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        onBlur={handleImdbIdBlur}
        required
        error={hasImdbIdError}
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
