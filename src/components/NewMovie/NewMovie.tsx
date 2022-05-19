import React, { ChangeEvent, FormEvent, useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initialMovie);

  const movieHandler = (
    event: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setMovie({ ...movie, [name]: value });
  };

  const submitHandler = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    addMovie(movie);
  };

  return (
    <div className="NewMovie">
      <form onSubmit={submitHandler} className="NewMovie__form">
        <h1 className="NewMovie__title">Add new movie</h1>

        <label className="NewMovie__label">
          Title
          <input
            type="text"
            name="title"
            value={movie.title}
            className="NewMovie__input"
            placeholder="Title"
            required
            onChange={movieHandler}
          />
        </label>

        <label className="NewMovie__label">
          Description
          <textarea
            name="description"
            value={movie.description}
            className="NewMovie__input NewMovie__textarea"
            placeholder="Description"
            onChange={movieHandler}
          />
        </label>

        <label className="NewMovie__label">
          ImgUrl
          <input
            type="text"
            name="imgUrl"
            value={movie.imgUrl}
            className="NewMovie__input"
            placeholder="imgUrl"
            required
            onChange={movieHandler}
          />
        </label>

        <label className="NewMovie__label">
          ImdbUrl
          <input
            type="text"
            name="imdbUrl"
            value={movie.imdbUrl}
            className="NewMovie__input"
            placeholder="imdbUrl"
            required
            onChange={movieHandler}
          />
        </label>

        <label className="NewMovie__label">
          ImdbId
          <input
            type="text"
            name="imdbId"
            value={movie.imdbId}
            className="NewMovie__input"
            placeholder="imdbId"
            required
            onChange={movieHandler}
          />
        </label>

        <button type="submit" className="NewMovie__button">Add movie</button>
      </form>
    </div>
  );
};
