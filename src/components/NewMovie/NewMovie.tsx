import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isImgUrlError, setIsImgUrlError] = useState(false);
  const [isImdbUrlError, setIsImdbUrlError] = useState(false);
  const [isImdbIdError, setIsImdbIdError] = useState(false);

  const isUrl = (url: string) => {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(url);
  };

  const isButtonDisabled = () => {
    if (title.trim().length && imdbId.trim().length && isUrl(imgUrl) && isUrl(imdbUrl)) {
      return false;
    }

    return true;
  };

  const resetErrors = () => {
    setIsTitleError(false);
    setIsImgUrlError(false);
    setIsImdbUrlError(false);
    setIsImdbIdError(false);
  };

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetInputs();
    resetErrors();
  };

  return (
    <form
      className="form"
      onSubmit={onSubmitForm}
    >
      <label
        htmlFor="title"
        className={classNames('label', { 'label--error': isTitleError })}
      >
        <input
          className={classNames('input', { 'input--error': isTitleError })}
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => setIsTitleError(!title.trim())}
        />
      </label>

      <label
        htmlFor="description"
        className="label"
      >
        <input
          className="input"
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label
        htmlFor="imgUrl"
        className={classNames('label', { 'label--error': isImgUrlError })}
      >
        <input
          className={classNames('input', { 'input--error': isImgUrlError })}
          type="text"
          id="imgUrl"
          placeholder="Image Url"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          onBlur={() => setIsImgUrlError(!isUrl(imgUrl))}
        />
      </label>

      <label
        htmlFor="title"
        className={classNames('label', { 'label--error': isImdbUrlError })}
      >
        <input
          className={classNames('input', { 'input--error': isImdbUrlError })}
          type="text"
          id="imdbUrl"
          placeholder="IMDB Url"
          value={imdbUrl}
          onChange={event => setImdbUrl(event.target.value)}
          onBlur={() => setIsImdbUrlError(!isUrl(imdbUrl))}
        />
      </label>

      <label
        htmlFor="imdbId"
        className={classNames('label', { 'label--error': isImdbIdError })}
      >
        <input
          className={classNames('input', { 'input--error': isImdbIdError })}
          type="text"
          id="imdbId"
          placeholder="IMDB Id"
          value={imdbId}
          onChange={(event) => setImdbId(event.target.value)}
          onBlur={() => setIsImdbIdError(!imdbId.trim())}
        />
      </label>

      <button
        className="button"
        type="submit"
        disabled={isButtonDisabled()}
      >
        Add
      </button>
    </form>
  );
};
