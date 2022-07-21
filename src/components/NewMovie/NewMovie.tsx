import React, { useState, useEffect } from 'react';
import './NewMovie.scss';

type Props = {
  submitMovie: (movie: Movie) => void,
};

const clearMovieForm: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ submitMovie }) => {
  const [newMovie, setNewMovie] = useState<Movie>(clearMovieForm);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(true);
  const [isTitle, setIsTitle] = useState(true);
  const [isImgUrl, setIsImgUrl] = useState(false);
  const [isImdbUrl, setIsImdbUrl] = useState(false);
  const [isImdbId, setIsImdbId] = useState(false);

  const checkBtnDisable = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = newMovie;

    if (title && imgUrl && imdbUrl && imdbId) {
      setIsBtnDisabled(false);
    } else {
      setIsBtnDisabled(true);
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { value, name } = event.target;

    switch (name) {
      case 'title':
        setIsTitle(!value);
        break;

      case 'imgUrl':
        setIsImgUrl(!value);
        break;

      case 'imdbUrl':
        setIsImdbUrl(!value);
        break;

      case 'imdbId':
        setIsImdbId(!value);
        break;

      default:
        break;
    }
  };

  useEffect(checkBtnDisable);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();

    submitMovie(newMovie);
    setNewMovie(clearMovieForm);
    setIsBtnDisabled(true);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <input
        name="title"
        placeholder="Title"
        className="input movieAdd__title"
        data-cy="form-title"
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      {isTitle && (
        <div className="error-block">
          This field is required
        </div>
      )}

      <input
        name="description"
        placeholder="Description"
        className="input movieAdd__description"
        data-cy="form-description"
        onChange={handleChange}
      />

      <input
        name="imgUrl"
        placeholder="ImgUrl"
        className="input movieAdd__imgUrl"
        data-cy="form-imgUrl"
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      {isImgUrl && (
        <div className="error-block">
          This field is required
        </div>
      )}

      <input
        name="imdbUrl"
        placeholder="ImdbUrl"
        className="input movieAdd__imdbUrl"
        data-cy="form-imdbUrl"
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      {isImdbUrl && (
        <div className="error-block">
          This field is required
        </div>
      )}

      <input
        name="imdbId"
        placeholder="ImdbId"
        className="input movieAdd__imdbId"
        data-cy="form-imdbId"
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      {isImdbId && (
        <div className="error-block">
          This field is required
        </div>
      )}

      <button
        type="submit"
        className="button"
        disabled={isBtnDisabled}
      >
        Submit
      </button>
    </form>
  );
};
