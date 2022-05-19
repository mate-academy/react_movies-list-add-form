import React, {
  useEffect,
  useState,
} from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const newMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(newMovie);
  const [errors, setErrors] = useState({
    ...newMovie,
    description: 'toInitialValidate',
  });
  const [currentValid, setCurrentValid] = useState(false);
  // eslint-disable-next-line
  const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setMovie({ ...movie, [name]: value });
  };

  const validateTitle = () => {
    let errorMessage = '';

    if (!movie.title) {
      errorMessage = 'Type title';
    }

    setErrors({
      ...errors,
      title: errorMessage,
    });

    return errorMessage;
  };

  const validateImdbUrl = () => {
    let errorMessage = '';

    if (!movie.imdbUrl) {
      errorMessage = 'Type ImdbUrl';
    } else if (!urlRegex.test(movie.imdbUrl)) {
      errorMessage = 'Incorrect URL';
    }

    setErrors({
      ...errors,
      imdbUrl: errorMessage,
    });

    return errorMessage;
  };

  const validateImgUrl = () => {
    let errorMessage = '';

    if (!movie.imgUrl) {
      errorMessage = 'Type ImgUrl';
    } else if (!urlRegex.test(movie.imgUrl)) {
      errorMessage = 'Incorrect URL';
    }

    setErrors({
      ...errors,
      imgUrl: errorMessage,
    });

    return errorMessage;
  };

  const validateImdbId = () => {
    let errorMessage = '';

    if (!movie.imdbId) {
      errorMessage = 'Type ImdbId';
    }

    setErrors({
      ...errors,
      imdbId: errorMessage,
      description: errorMessage,
    });

    return errorMessage;
  };

  const isValid: ()=> boolean = () => {
    const errorsArr = Object.values(errors);

    return errorsArr.every(e => !e);
  };

  useEffect(() => {
    setCurrentValid(isValid);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid()) {
      addMovie(movie);
      setMovie(newMovie);
    }
  };

  return (
    <>
      <h2 className="form-title">Add Film Form</h2>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="form__input-wrapper">
          <input
            className="form__input"
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
        </div>

        <div className="form__input-wrapper">
          <textarea
            className="form__input"
            name="description"
            value={movie.description}
            onChange={handleChange}
            placeholder="About new film"
            autoComplete="off"
          />
        </div>

        <div className="form__input-wrapper">
          <input
            className="form__input"
            type="text"
            name="imgUrl"
            value={movie.imgUrl}
            onChange={handleChange}
            onBlur={validateImgUrl}
            placeholder="https://imgUrl/example.jpg"
            autoComplete="off"
          />
          {errors.imgUrl.length > 0
            && <p className="form__error-message">{errors.imgUrl}</p>}
        </div>

        <div className="form__input-wrapper">
          <input
            className="form__input"
            type="text"
            name="imdbUrl"
            value={movie.imdbUrl}
            onChange={handleChange}
            onBlur={validateImdbUrl}
            placeholder="https://www.imdb.com/title/tt1375666"
            autoComplete="off"
          />
          {errors.imdbUrl.length > 0
            && <p className="form__error-message">{errors.imdbUrl}</p>}
        </div>

        <div className="form__input-wrapper">
          <input
            className="form__input"
            type="text"
            name="imdbId"
            value={movie.imdbId}
            onChange={handleChange}
            onBlur={validateImdbId}
            placeholder="tt1375666"
            autoComplete="off"
          />
          {errors.imdbId.length > 0
            && <p className="form__error-message">{errors.imdbId}</p>}
        </div>

        <button
          type="submit"
          className="form__button"
          disabled={!currentValid}
        >
          Add new film
        </button>
      </form>
    </>
  );
};
