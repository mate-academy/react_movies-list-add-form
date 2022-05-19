import React, { FormEvent, ChangeEvent, useState } from 'react';

import './NewMovie.scss';

type Props = {
  newMovie: (movies: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ newMovie }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initialMovie);

  const moviesHandler = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setMovie({ ...movie, [name]: value });
  };

  const submitHandler = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    newMovie(movie);
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <h1 className="form__title">Add form</h1>

      <label className="form__label">
        <input
          type="text"
          name="title"
          value={movie.title}
          className="form__input"
          placeholder="title"
          onChange={moviesHandler}
        />
      </label>

      <label className="form__label">
        <textarea
          name="description"
          value={movie.description}
          className="form__input form__input--description"
          placeholder="description"
          onChange={moviesHandler}
        />
      </label>

      <label className="form__label">
        <input
          type="text"
          name="imgUrl"
          value={movie.imgUrl}
          className="form__input"
          placeholder="imgUrl"
          onChange={moviesHandler}
        />
      </label>

      <label className="form__label">
        <input
          type="text"
          name="imdbUrl"
          value={movie.imdbUrl}
          className="form__input"
          placeholder="imdbUrl"
          onChange={moviesHandler}
        />
      </label>

      <label className="form__label">
        <input
          type="text"
          name="imdbId"
          value={movie.imdbId}
          className="form__input"
          placeholder="imdbId"
          onChange={moviesHandler}
        />
      </label>

      <button type="submit" className="form__button">Add</button>
    </form>
  );
};
