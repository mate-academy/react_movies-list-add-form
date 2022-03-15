import { useState } from 'react';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void,
};

const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isImgUrlTouched, setIsImgUrlTouched] = useState(false);
  const [isImdbUrlTouched, setIsImdbUrlTouched] = useState(false);
  const [isImdbIdTouched, setIsImdbIdTouched] = useState(false);

  const isUrl = (url: string) => {
    return regex.test(url);
  };

  const errors = {
    title: title.trim().length === 0,
    imgUrl: imgUrl.trim().length === 0 || !isUrl(imgUrl),
    imdbUrl: imdbUrl.trim().length === 0 || !isUrl(imdbUrl),
    imdbId: imdbId.trim().length === 0,
  };

  const isButtonDisabled = () => {
    if (title.trim().length && imdbId.trim().length && isUrl(imgUrl) && isUrl(imdbUrl)) {
      return false;
    }

    return true;
  };

  const resetTouchInfo = () => {
    setIsTitleTouched(false);
    setIsImgUrlTouched(false);
    setIsImdbUrlTouched(false);
    setIsImdbIdTouched(false);
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
    resetTouchInfo();
  };

  return (
    <form
      className="form"
      onSubmit={onSubmitForm}
    >

      <label htmlFor="title" className="label">
        <input
          className={classNames(
            'input',
            { 'input--error': isTitleTouched && errors.title },
          )}
          type="text"
          id={title}
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => setIsTitleTouched(true)}
        />

        <div
          className={classNames(
            'message',
            { 'message--hidden': !isTitleTouched || !errors.title },
          )}
        >
          Please enter data in correct format
        </div>
      </label>

      <label htmlFor="description" className="label">
        <input
          className="input"
          type="text"
          id={description}
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label
        htmlFor="imgUrl"
        className="label"
      >
        <input
          className={classNames(
            'input',
            { 'input--error': isImgUrlTouched && errors.imgUrl },
          )}
          type="text"
          id="imgUrl"
          placeholder="Image Url"
          value={imgUrl}
          onChange={(event) => setImgUrl(event.target.value)}
          onBlur={() => setIsImgUrlTouched(true)}
        />

        <div
          className={classNames(
            'message',
            { 'message--hidden': !isImgUrlTouched || !errors.imgUrl },
          )}
        >
          Please enter data in correct format
        </div>
      </label>

      <label htmlFor="imdbUrl" className="label">
        <input
          className={classNames(
            'input',
            { 'input--error': isImdbUrlTouched && errors.imdbUrl },
          )}
          type="text"
          id="imdbUrl"
          placeholder="IMDB Url"
          value={imdbUrl}
          onChange={event => setImdbUrl(event.target.value)}
          onBlur={() => setIsImdbUrlTouched(true)}
        />

        <div
          className={classNames(
            'message',
            { 'message--hidden': !isImdbUrlTouched || !errors.imdbUrl },
          )}
        >
          Please enter data in correct format
        </div>
      </label>

      <label
        htmlFor="imdbId"
        className="label"
      >
        <input
          className={classNames(
            'input',
            { 'input--error': isImdbIdTouched && errors.imdbId },
          )}
          type="text"
          id="imdbId"
          placeholder="IMDB Id"
          value={imdbId}
          onChange={(event) => setImdbId(event.target.value)}
          onBlur={() => setIsImdbIdTouched(true)}
        />

        <div
          className={classNames(
            'message',
            { 'message--hidden': !isImdbIdTouched || !errors.imdbId },
          )}
        >
          Please enter data in correct format
        </div>
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
