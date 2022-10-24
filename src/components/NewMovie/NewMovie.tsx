import React, { MouseEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newFilm: Movie) => void
};

type Event = {
  target: { name: string,
    value: string,
  }
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const newFilm = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [film, setFilm] = useState(newFilm);
  const isValid = film.title.trim()
  && film.imgUrl.trim() && film.imdbUrl.trim() && film.imdbId.trim();

  const handleFilmSumbit = (event: MouseEvent) => {
    event.preventDefault();
    onAdd(film);
    setFilm(newFilm);
    setCount(count + 1);
  };

  const handleInputChange = (event: Event) => {
    const { name, value } = event.target;

    setFilm({ ...film, [name]: value });
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={film.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={film.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={film.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={film.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={film.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleFilmSumbit}
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
