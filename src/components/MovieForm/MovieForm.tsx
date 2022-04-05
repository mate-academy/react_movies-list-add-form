import './MovieForm.scss';
import {
  FC, FormEvent, memo, useCallback, useState,
} from 'react';
import { urlRegex } from '../../constants/regexes';
import { FormInput } from '../FormInput';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const MovieForm: FC<Props> = memo(({ onAdd }) => {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);

  const isValidUrl = (value: string) => urlRegex.test(value);

  const isValidMovie = Boolean(title) && Boolean(imdbId)
    && isValidUrl(imgUrl)
    && isValidUrl(imdbUrl);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleTitleChange = useCallback(({ target }) => {
    setTitleError(false);
    setTitle(target.value);
  }, []);

  const handleTitleBlur = useCallback(({ target }) => {
    if (!target.value) {
      setTitleError(true);
    }
  }, []);

  const handleImgUrlChange = useCallback(({ target }) => {
    setImgUrlError(false);
    setImgUrl(target.value);
  }, []);

  const handleImgUrlBlur = useCallback(({ target }) => {
    if (!isValidUrl(target.value)) {
      setImgUrlError(true);
    }
  }, []);

  const handleImdbUrlChange = useCallback(({ target }) => {
    setImdbUrlError(false);
    setImdbUrl(target.value);
  }, []);

  const handleImdbUrlBlur = useCallback(({ target }) => {
    if (!isValidUrl(target.value)) {
      setImdbUrlError(true);
    }
  }, []);

  const handleImdbIdChange = useCallback(({ target }) => {
    setImdbIdError(false);
    setImdbId(target.value);
  }, []);

  const handleImdbIdBlur = useCallback(({ target }) => {
    if (!target.value) {
      setImdbIdError(true);
    }
  }, []);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidMovie) {
      onAdd({
        title, description, imgUrl, imdbUrl, imdbId,
      });

      clearForm();
    }
  };

  return (
    <form
      className="MovieForm__form"
      action="#"
      method="post"
      onSubmit={handleFormSubmission}
    >
      <FormInput
        value={title}
        name="title"
        isValid={hasTitleError}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
      />

      <label
        htmlFor="description"
        className="MovieForm__description-label"
      >
        Description

        <textarea
          className="MovieForm__description-input"
          name="description"
          placeholder="Enter your description..."
          value={description}
          onChange={({ target }) => {
            setDescription(target.value);
          }}
        />
      </label>

      <FormInput
        value={imgUrl}
        name="imgUrl"
        isValid={hasImgUrlError}
        onChange={handleImgUrlChange}
        onBlur={handleImgUrlBlur}
      />

      <FormInput
        value={imdbUrl}
        name="ImdbUrl"
        isValid={hasImdbUrlError}
        onChange={handleImdbUrlChange}
        onBlur={handleImdbUrlBlur}
      />

      <FormInput
        value={imdbId}
        name="ImdbId"
        isValid={hasImdbIdError}
        onChange={handleImdbIdChange}
        onBlur={handleImdbIdBlur}
      />

      <button
        className="MovieForm__button"
        type="submit"
        disabled={!isValidMovie}
      >
        Submit
      </button>
    </form>
  );
});
