import { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errorValidation, setErrorValidation] = useState({
    isTitleValid: true,
    isDescriptionValid: true,
    isImgUrlValid: true,
    isImdbUrlValid: true,
    isImdbIdValid: true,
  });

  const inputValidation = () => {
    if (!movie.title) {
      setErrorValidation(() => (
        { ...errorValidation, isTitleValid: false }));
    }

    if (!movie.description) {
      setErrorValidation(() => (
        { ...errorValidation, isDescriptionValid: false }));
    }

    if (!movie.imgUrl) {
      setErrorValidation(() => (
        { ...errorValidation, isImgUrlValid: false }));
    }

    if (!movie.imdbUrl) {
      setErrorValidation(() => (
        { ...errorValidation, isImdbIdValid: false }));
    }

    if (!movie.imdbId) {
      setErrorValidation(() => (
        { ...errorValidation, isImdbIdValid: false }));
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    inputValidation();

    const formInputs = [
      movie.title,
      movie.description,
      movie.imgUrl,
      movie.imdbUrl,
      movie.imdbId,
    ];

    if (formInputs.every(input => input !== '')) {
      const newMovieAdd = {
        title: movie.title,
        description: movie.description,
        imgUrl: movie.imgUrl,
        imdbUrl: movie.imdbUrl,
        imdbId: movie.imdbId,
      };

      onAdd(newMovieAdd);

      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>

      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          value={movie.title}
          data-cy="form-title"
          onChange={(event) => {
            setErrorValidation(() => (
              { ...errorValidation, isTitleValid: true }));
            setMovie({ ...movie, title: event.target.value });
          }}
        />

        <input
          type="text"
          placeholder="Description"
          value={movie.description}
          data-cy="form-description"
          onChange={(event) => {
            setErrorValidation(() => (
              { ...errorValidation, isDescriptionValid: true }));
            setMovie({ ...movie, description: event.target.value });
          }}
        />

        <input
          type="text"
          placeholder="Image url"
          value={movie.imgUrl}
          data-cy="form-imgUrl"
          onChange={(event) => {
            setErrorValidation(() => (
              { ...errorValidation, isImgUrlValid: true }));
            setMovie({ ...movie, imgUrl: event.target.value });
          }}
        />

        <input
          type="text"
          placeholder="IMDB url"
          value={movie.imdbUrl}
          data-cy="form-imdbUrl"
          onChange={(event) => {
            setErrorValidation(() => (
              { ...errorValidation, isImdbUrlValid: true }));
            setMovie({ ...movie, imdbUrl: event.target.value });
          }}
        />

        <input
          type="text"
          placeholder="IMDB ID"
          value={movie.imdbId}
          data-cy="form-imdbId"
          onChange={(event) => {
            setErrorValidation(() => (
              { ...errorValidation, isImdbIdValid: true }));
            setMovie({ ...movie, imdbId: event.target.value });
          }}
        />
      </div>

      <button
        className="submit-button"
        type="submit"
        data-cy="form-submit-button"
      >
        Submit
      </button>

    </form>
  );
};
