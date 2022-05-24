import React, { ChangeEvent, FormEvent, useState } from 'react';
import './NewMovie.scss';
import Add from '../../image/Add.png';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, seNewtMovie] = useState(defaultMovie);
  const [Error, setError] = useState(false);
  const [ErrorMassage, setErrorMassage] = useState('');

  const movieHandler = (
    event: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    seNewtMovie({ ...movie, [name]: value });
  };

  const submitHandler = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!movie.title.trim() || !movie.imgUrl.trim()
    || !movie.imdbUrl.trim() || !movie.imdbId.trim()) {
      setError(true);
      setErrorMassage('Invalid input');
    } else {
      setError(false);
      addMovie(movie);
      seNewtMovie(defaultMovie);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <label className="form__label">
          Title
          <input
            type="text"
            name="title"
            value={movie.title}
            className="form__input"
            placeholder="Title"
            onChange={movieHandler}
            required
          />
        </label>

        <label className="form__label">
          Description
          <textarea
            name="description"
            value={movie.description}
            className="form__input form__input--description"
            placeholder="Description"
            onChange={movieHandler}
            required
          />
        </label>

        <label className="form__label">
          ImgUrl
          <input
            type="text"
            name="imgUrl"
            value={movie.imgUrl}
            className="form__input"
            placeholder="ImgUrl"
            onChange={movieHandler}
            required
          />
        </label>

        <label className="form__label">
          ImdbUrl
          <input
            type="text"
            name="imdbUrl"
            value={movie.imdbUrl}
            className="form__input"
            placeholder="ImdbUrl"
            onChange={movieHandler}
            required
          />
        </label>

        <label className="form__label">
          ImdbId
          <input
            type="text"
            name="imdbId"
            value={movie.imdbId}
            className="form__input"
            placeholder="ImdbId"
            onChange={movieHandler}
            required
          />
        </label>

        <button
          type="submit"
          className="form__button"
        >
          <img
            src={Add}
            alt="Add"
            className="form__button--image"
          />
        </button>
        {Error && <p className="error">{ErrorMassage}</p>}
      </form>
    </div>
  );
};
