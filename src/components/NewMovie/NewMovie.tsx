import React, { useState } from 'react';
import { TextField } from '../TextField';
type Props = {
  onAdd?: (movie: Movie) => void;
};
export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setImdbIdError] = useState(false);
  const [count, setCount] = useState(0);
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const handlerTitleChanged = (newValue: string) => {
    setTitle(newValue);
    setTitleError(false);
  };

  const handlerImgUrlChanged = (newValue: string) => {
    setImgUrl(newValue);
    setImgUrlError(false);
  };

  const handlerDescriptionChanged = (newValue: string) => {
    setDescription(newValue);
  };

  const handlerImdbUrlChanged = (newValue: string) => {
    setImdbUrl(newValue);
    setImdbUrlError(false);
  };

  const handlerImdbIdChanged = (newValue: string) => {
    setImdbId(newValue);
    setImdbIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);
    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    if (!pattern.test(imgUrl)) {
      setImgUrlError(true);
      alert('Invalid URL!');

      return;
    }

    if (!pattern.test(imdbUrl)) {
      setImdbUrlError(true);
      alert('Invalid imdbUrl');

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitleError(false);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handlerTitleChanged}
        error={hasTitleError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handlerDescriptionChanged}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handlerImgUrlChanged}
        required
        error={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handlerImdbUrlChanged}
        required
        error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handlerImdbIdChanged}
        error={hasImdbIdError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
