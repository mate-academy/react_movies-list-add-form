import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  // eslint-disable-next-line
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const heandleTittleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const heandleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(event.target.value);
  };

  const heandleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setHasImgUrlError(false);
  };

  const heandleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setHasImdbUrlError(false);
  };

  const heandleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setHasImdbIdError(false);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const heandleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImgUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImdbIdError(!imdbId);

    if (!title || !pattern.test(imgUrl) || !pattern.test(imdbUrl) || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(currentCount => currentCount + 1);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={heandleAdd}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={heandleTittleChange}
        hasError={hasTitleError}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={heandleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        pattern={pattern}
        onChange={heandleImgUrlChange}
        hasError={hasImgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        pattern={pattern}
        onChange={heandleImdbUrlChange}
        hasError={hasImdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={heandleImdbIdChange}
        hasError={hasImdbIdError}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title ||
              !pattern.test(imgUrl) ||
              !pattern.test(imdbUrl) ||
              !imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
