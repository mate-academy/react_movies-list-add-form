import {
  FC,
  FormEvent,
  useState,
} from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAddMovie: (movie: Movie) => void
};

// eslint-disable-next-line max-len
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [errorMessageForTitle, setErrorMessageForTitle] = useState('');
  const [errorMessageForImgUrl, setErrorMessageForImgUrl] = useState('');
  const [errorMessageForImdbUrl, setErrorMessageForImdbUrl] = useState('');
  const [errorMessageForImdbId, setErrorMessageForImdbId] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  const validation = () => {
    const inputs = [
      title,
      imgUrl,
      imdbUrl,
      imdbId];

    const errors = [
      errorMessageForImdbId,
      errorMessageForImdbUrl,
      errorMessageForImgUrl,
      errorMessageForTitle];

    const isValidInputs = inputs.every((input) => input !== '');
    const isNoErrors = errors.every((error) => error === '');

    if (isValidInputs && isNoErrors) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const titleValidation = () => {
    if (!title) {
      setErrorMessageForTitle('Please enter a title');
      validation();

      return false;
    }

    setErrorMessageForTitle('');
    validation();

    return true;
  };

  const imdbUrlValidation = () => {
    if (!imdbUrl || !urlPattern.test(imdbUrl)) {
      setErrorMessageForImdbUrl('Please enter a valid link');
      validation();

      return false;
    }

    setErrorMessageForImdbUrl('');
    validation();

    return true;
  };

  const imgUrlValidation = () => {
    if (!imgUrl || !urlPattern.test(imgUrl)) {
      setErrorMessageForImgUrl('Please enter a valid link');
      validation();

      return false;
    }

    setErrorMessageForImgUrl('');
    validation();

    return true;
  };

  const imdbIdValidation = () => {
    if (!imdbId) {
      setErrorMessageForImdbId('Please enter a valid id');
      validation();

      return false;
    }

    setErrorMessageForImdbId('');
    validation();

    return true;
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setFormValid(false);

    onAddMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const handleTitle = (currentTitle: string) => {
    setTitle(currentTitle);
    setErrorMessageForTitle('');
  };

  const handleImgUrl = (currentImgUrl: string) => {
    setImgUrl(currentImgUrl);
    setErrorMessageForImgUrl('');
  };

  const handleImdbUrl = (currentImdbUrl: string) => {
    setImdbUrl(currentImdbUrl);
    setErrorMessageForImdbUrl('');
  };

  const handleImdbId = (currentImdbId: string) => {
    setImdbId(currentImdbId);
    setErrorMessageForImdbId('');
  };

  return (
    <form
      className="app-form"
      method="post"
      name="onAdd"
      onSubmit={submitForm}
    >
      <label className="app-form__field">
        <h2>Title</h2>
        <input
          className={classNames(
            'app-form__input',
            { 'app-form__input--error': errorMessageForTitle },
          )}
          type="text"
          name="title"
          placeholder="Idiocracy"
          value={title}
          onChange={({ target }) => {
            handleTitle(target.value);
          }}
          onBlur={titleValidation}
        />
        <span
          className="app-form__error"
        >
          {errorMessageForTitle}
        </span>
      </label>

      <label className="app-form__field">
        <h2>Description</h2>
        <textarea
          className="app-form__input"
          name="description"
          placeholder="Prophetic film..."
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
      </label>

      <label className="app-form__field">
        <h2>Poster</h2>
        <input
          className={classNames(
            'app-form__input',
            { 'app-form__input--error': errorMessageForImgUrl },
          )}
          type="text"
          name="imgUrl"
          placeholder="https://m.media-amazon.com/images/"
          value={imgUrl}
          onChange={({ target }) => {
            handleImgUrl(target.value);
          }}
          onBlur={imgUrlValidation}
        />
        <span
          className="app-form__error"
        >
          {errorMessageForImgUrl}
        </span>
      </label>

      <label className="app-form__field">
        <h2>IMDB link</h2>
        <input
          className={classNames(
            'app-form__input',
            { 'app-form__input--error': errorMessageForImdbUrl },
          )}
          type="text"
          name="imdbUrl"
          placeholder="https://www.imdb.com/title"
          value={imdbUrl}
          onChange={({ target }) => {
            handleImdbUrl(target.value);
          }}
          onBlur={imdbUrlValidation}
        />
        <span
          className="app-form__error"
        >
          {errorMessageForImdbUrl}
        </span>
      </label>

      <label className="app-form__field">
        <h2>IMDB id</h2>
        <input
          className={classNames(
            'app-form__input',
            { 'app-form__input--error': errorMessageForImdbId },
          )}
          type="text"
          name="imdbId"
          placeholder="tt1234567"
          value={imdbId}
          onChange={({ target }) => {
            handleImdbId(target.value);
          }}
          onBlur={imdbIdValidation}
        />
        <span
          className="app-form__error"
        >
          {errorMessageForImdbId}
        </span>
      </label>

      <button
        className="app-form__btn"
        type="submit"
        name="submit"
        disabled={!isFormValid}
      >
        Add movie
      </button>
    </form>
  );
};
