import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>(initialMovie);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const handleNewMovieSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);

    setNewMovie(initialMovie);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  return (
    <form
      className="NewMovie"
      onSubmit={handleNewMovieSubmit}
    >
      <input
        type="text"
        data-cy="form-title"
        placeholder="Title"
        className="NewMovie__input"
        name="title"
        value={title}
        onChange={handleInputChange}
      />

      <input
        type="text"
        data-cy="form-description"
        placeholder="Description"
        className="NewMovie__input"
        name="description"
        value={description}
        onChange={handleInputChange}
      />
      <input
        type="url"
        data-cy="form-imgUrl"
        placeholder="ImgUrl"
        className="NewMovie__input"
        name="imgUrl"
        value={imgUrl}
        onChange={handleInputChange}
      />
      <input
        type="url"
        data-cy="form-imdbUrl"
        placeholder="ImdbUrl"
        className="NewMovie__input"
        name="imdbUrl"
        value={imdbUrl}
        onChange={handleInputChange}

      />
      <input
        type="text"
        data-cy="form-imdbId"
        placeholder="ImdbId"
        className="NewMovie__input"
        name="imdbId"
        value={imdbId}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        data-cy="form-submit-button"
        className="NewMovie__button"
      >
        OnAdd
      </button>
    </form>
  );
};
