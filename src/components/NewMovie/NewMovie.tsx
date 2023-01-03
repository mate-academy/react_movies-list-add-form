import {
  FC, FormEvent, useCallback, useState,
} from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasDescriptionError, setDescriptionError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIDError, setImdbIdError] = useState(false);

  const isMovieValid = Boolean(title)
    && Boolean(imdbId)
    && (imgUrl)
    && (imdbUrl);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImdbId('');
  };

  const handleTitleChange = useCallback((event) => {
    setTitle(event);
    setTitleError(false);
  }, []);

  const handleTitleBlur = useCallback(({ target }) => {
    if (!target.value) {
      setTitleError(true);
    }
  }, []);

  const handleDescription = useCallback((event) => {
    setDescriptionError(false);
    setDescription(event);
  }, []);

  const handleimgUrlChange = useCallback((event) => {
    setImgUrlError(false);
    setimgUrl(event);
  }, []);

  const handleImgUrlBlur = useCallback(({ target }) => {
    if (!(target.value)) {
      setImgUrlError(true);
    }
  }, []);

  const handleimdbUrlChange = useCallback((event) => {
    setImdbUrlError(false);
    setimdbUrl(event);
  }, []);

  const handleImdbUrlBlur = useCallback(({ target }) => {
    if (!(target.value)) {
      setImdbUrlError(true);
    }
  }, []);

  const handleImbdIdChange = useCallback((event) => {
    setImdbId(event);
  }, []);

  const handleImdbIdBlur = useCallback(({ target }) => {
    if (!target.value) {
      setImdbIdError(true);
    }
  }, []);

  const handleFormSubmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (isMovieValid) {
    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    clearForm();
    setCount(count + 1);
    // }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      action="#"
      method="post"
      onSubmit={handleFormSubmission}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        id={count}
        name="title"
        label="Title"
        data-cy={title}
        isValid={hasTitleError}
        value={title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        required
      />

      <TextField
        name="description"
        label="Description"
        isValid={hasDescriptionError}
        value={description}
        data-cy={description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        isValid={hasImgUrlError}
        value={imgUrl}
        data-cy={imgUrl}
        onChange={handleimgUrlChange}
        onBlur={handleImgUrlBlur}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        data-cy={imdbUrl}
        isValid={hasImdbUrlError}
        value={imdbUrl}
        onChange={handleimdbUrlChange}
        onBlur={handleImdbUrlBlur}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        isValid={hasImdbIDError}
        value={imdbId}
        data-cy={imdbId}
        onChange={handleImbdIdChange}
        onBlur={handleImdbIdBlur}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isMovieValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
