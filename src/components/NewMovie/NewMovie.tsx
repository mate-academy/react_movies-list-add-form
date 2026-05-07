import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = ({ onAdd }) => {

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const [hasImdbIdError, setHasImdbIdError] = useState(false);
  const [count, setCount] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setHasImgUrlError(false);
  };

  const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setHasImdbUrlError(false);
  };

  const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setHasImdbIdError(false);
  };

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
    setCount(prev => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);

      return;
    }

    if (!imgUrl) {
      setHasImgUrlError(true);

      return;
    }

    if (!imdbUrl) {
      setHasImdbUrlError(true);

      return;
    }

    if (!imdbId) {
      setHasImdbIdError(true);

      return;
    }

    onAdd(newMovie);
    resetForm();
  };

  const isFormValid = title && imgUrl && imdbUrl && imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />
      {hasTitleError && <p className="error">Title is required`</p>}

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />
      {hasImgUrlError && <p className="error">ImgUrl is required`</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />
      {hasImdbUrlError && <p className="error">ImdbUrl is required`</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />
      {hasImdbIdError && <p className="error">ImdbId is required`</p>}

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

          <button
            type="reset"
            data-cy="reset-button"
            className="button is-link is-light"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};
