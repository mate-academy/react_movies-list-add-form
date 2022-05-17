import {
  FC,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const initialError = {
    ...initialMovie,
  };

  const [movie, setMovie] = useState(initialMovie);
  const [errors, setErrors] = useState(initialError);
  // eslint-disable-next-line
  const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setMovie({ ...movie, [name]: value });
  };

  const validateTitle = () => {
    let errorMessage = initialError.title;

    if (!movie.title) {
      errorMessage = 'Title is required!';
    }

    setErrors({
      ...errors,
      title: errorMessage,
    });

    return errorMessage;
  };

  const validateImdbUrl = () => {
    let errorMessage = initialError.imdbUrl;

    if (!movie.imdbUrl) {
      errorMessage = 'ImdbUrl is required!';
    } else if (!urlRegex.test(movie.imdbUrl)) {
      errorMessage = 'Please enter valid URL!';
    }

    setErrors({
      ...errors,
      imdbUrl: errorMessage,
    });

    return errorMessage;
  };

  const validateImgUrl = () => {
    let errorMessage = initialError.imgUrl;

    if (!movie.imgUrl) {
      errorMessage = 'ImgUrl is required!';
    } else if (!urlRegex.test(movie.imgUrl)) {
      errorMessage = 'Please enter valid URL!';
    }

    setErrors({
      ...errors,
      imgUrl: errorMessage,
    });

    return errorMessage;
  };

  const validateImdbId = () => {
    let errorMessage = initialError.imdbId;

    if (!movie.imdbId) {
      errorMessage = 'ImdbId is required!';
    }

    setErrors({
      ...errors,
      imdbId: errorMessage,
    });

    return errorMessage;
  };

  const validateAll = () => {
    const currentErrors = { ...errors };

    currentErrors.title = validateTitle();
    currentErrors.imgUrl = validateImgUrl();
    currentErrors.imdbUrl = validateImdbUrl();
    currentErrors.imdbId = validateImdbId();

    return currentErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentErrors = validateAll();
    const currentValid
      = Object.values(currentErrors).every(value => !value);

    setErrors(currentErrors);

    if (currentValid) {
      addMovie(movie);
      setMovie(initialError);
    }
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <label className="form__label">
        * Title
        <input
          className={`form__input
            ${errors.title.length > 0 && 'form__input--error'}`}
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
          onBlur={validateTitle}
          placeholder="Film title"
          autoComplete="off"
        />
        {errors.title.length > 0
          && <p className="form__error-message">{errors.title}</p>}
      </label>

      <label className="form__label">
        Description
        <textarea
          className="form__text-area form__input"
          name="description"
          value={movie.description}
          onChange={handleChange}
          placeholder="About new film"
          autoComplete="off"
        />
      </label>

      <label className="form__label">
        * ImgUrl
        <input
          type="text"
          className={`form__input
            ${errors.imgUrl.length > 0 && 'form__input--error'}`}
          name="imgUrl"
          value={movie.imgUrl}
          onChange={handleChange}
          onBlur={validateImgUrl}
          placeholder="https://imgUrl/example.jpg"
          autoComplete="off"
        />
        {errors.imgUrl.length > 0
          && <p className="form__error-message">{errors.imgUrl}</p>}
      </label>

      <label className="form__label">
        * ImdbUrl
        <input
          type="text"
          className={`form__input
            ${errors.imdbUrl.length > 0 && 'form__input--error'}`}
          name="imdbUrl"
          value={movie.imdbUrl}
          onChange={handleChange}
          onBlur={validateImdbUrl}
          placeholder="https://www.imdb.com/title/tt1375666"
          autoComplete="off"
        />
        {errors.imdbUrl.length > 0
          && <p className="form__error-message">{errors.imdbUrl}</p>}
      </label>

      <label className="form__label">
        * ImdbId
        <input
          type="text"
          className={`form__input
            ${errors.imdbId.length > 0 && 'form__input--error'}`}
          name="imdbId"
          value={movie.imdbId}
          onChange={handleChange}
          onBlur={validateImdbId}
          placeholder="tt1375666"
          autoComplete="off"
        />
        {errors.imdbId.length > 0
          && <p className="form__error-message">{errors.imdbId}</p>}
      </label>

      <button
        type="submit"
        className="form__button"
      >
        Add new film
      </button>
      <p className="form__notation">* Required fields</p>
    </form>
  );
};
