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
  const [itemError, setitemError] = useState<boolean>(false);

  const movieHandler = (
    event: ChangeEvent<HTMLInputElement>
    | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (value.trim().length === 0) {
      setitemError(true);
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  const submitHandler = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    addMovie(movie);
  };

  return (
    <div className="newMovie">
      <form onSubmit={submitHandler} className="newMovie__form">
        <h1 className="newMovie__title">Add new movie</h1>

        <label className="newMovie__label">
          Title
          <input
            type="text"
            name="title"
            value={movie.title}
            className="newMovie__input"
            placeholder="Title"
            required
            onChange={movieHandler}
          />
          {itemError && <span className="newMovie__error">Item is empty</span>}
        </label>

        <label className="newMovie__label">
          Description
          <textarea
            name="description"
            value={movie.description}
            className="newMovie__input newMovie__textarea"
            placeholder="Description"
            onChange={movieHandler}
          />
        </label>

        <label className="newMovie__label">
          ImgUrl
          <input
            type="text"
            name="imgUrl"
            value={movie.imgUrl}
            className="newMovie__input"
            placeholder="imgUrl"
            required
            onChange={movieHandler}
          />
          {itemError && <span className="newMovie__error">Item is empty</span>}
        </label>

        <label className="newMovie__label">
          ImdbUrl
          <input
            type="text"
            name="imdbUrl"
            value={movie.imdbUrl}
            className="newMovie__input"
            placeholder="imdbUrl"
            required
            onChange={movieHandler}
          />
          {itemError && <span className="newMovie__error">Item is empty</span>}
        </label>

        <label className="newMovie__label">
          ImdbId
          <input
            type="text"
            name="imdbId"
            value={movie.imdbId}
            className="newMovie__input"
            placeholder="imdbId"
            required
            onChange={movieHandler}
          />
          {itemError && <span className="newMovie__error">Item is empty</span>}
        </label>

        <button type="submit" className="newMovie__button">Add movie</button>
      </form>
    </div>
  );
};
