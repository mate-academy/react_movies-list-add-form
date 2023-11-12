import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  function isValidHttpUrl(string: string): boolean {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const changeTitle = (newTitle: string): void => {
    setTitle(newTitle);
    setHasTitleError(false);
  };

  const [description, setDescription] = useState('');
  const changeDescription = (newDescription: string): void => {
    setDescription(newDescription);
  };

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const changeImgUrl = (newImgUrl: string): void => {
    setImgUrl(newImgUrl);
  };

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const changeImdbUrl = (newImdbUrl: string): void => {
    setImdbUrl(newImdbUrl);
  };

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);
  const changeImdbId = (newImdbId: string): void => {
    setImdbId(newImdbId);
  };

  const [count, setCount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImgUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImdbIdError(!imdbId);

    if (hasTitleError || hasImgUrlError
      || hasImdbUrlError || hasImdbIdError
      || !isValidHttpUrl(imgUrl) || !isValidHttpUrl(imdbUrl)) {
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
        value={title}
        onChange={changeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={changeImgUrl}
        required
        hasInvalidLink={!isValidHttpUrl(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl.trim()}
        onChange={changeImdbUrl}
        required
        hasInvalidLink={!isValidHttpUrl(imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={changeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title.trim() || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
