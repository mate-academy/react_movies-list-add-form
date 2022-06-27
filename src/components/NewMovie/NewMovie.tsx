import { useState } from 'react';
import cn from 'classnames';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const validateInput = () => {
    if (!title) {
      setHasTitleError(true);
    }

    if (!imgUrl) {
      setHasImgUrlError(true);
    }

    if (!imdbUrl) {
      setHasImdbUrlError(true);
    }

    if (!imdbId) {
      setHasImdbIdError(true);
    }
  };

  const submitValidForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="form"
      onSubmit={submitValidForm}
    >
      <input
        type="text"
        placeholder="Enter movie title"
        className={cn('input', { error: hasTitleError })}
        value={title}
        data-cy="form-title"
        onChange={(event) => {
          setTitle(event.target.value);
          setHasTitleError(false);
        }}
      />

      <textarea
        name="description"
        id=""
        placeholder="Enter description"
        className={cn('textarea', 'my-3')}
        value={description}
        data-cy="form-description"
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter image URL"
        className={cn('input', 'my-3', { error: hasImgUrlError })}
        value={imgUrl}
        data-cy="form-imgUrl"
        onChange={(event) => {
          setImgUrl(event.target.value);
          setHasImgUrlError(false);
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb URL"
        className={cn('input', 'my-3', { error: hasImdbUrlError })}
        value={imdbUrl}
        data-cy="form-imdbUrl"
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setHasImdbUrlError(false);
        }}
      />

      <input
        type="text"
        placeholder="Enter Imdb ID"
        className={cn('input', 'my-3', { error: hasImdbIdError })}
        value={imdbId}
        data-cy="form-imdbId"
        onChange={(event) => {
          setImdbId(event.target.value);
          setHasImdbIdError(false);
        }}
      />

      <button
        type="submit"
        className="button is-success my-3"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
