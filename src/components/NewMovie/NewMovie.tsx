import { FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const INITIAL_VALUES = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [film, setFilm] = useState(INITIAL_VALUES);

  const isBtnHidden = !film.title.trim()
  || !film.imgUrl.trim()
  || !film.imdbUrl.trim()
  || !film.imdbId.trim();

  const handleTitleChange = (value: string) => {
    setFilm(Film => ({ ...Film, title: value.trimStart() }));
  };

  const handleDescriptionChange = (value: string) => {
    setFilm(Film => ({ ...Film, description: value.trimStart() }));
  };

  const handleImgUrlChange = (value: string) => {
    setFilm(Film => ({ ...Film, imgUrl: value.trimStart() }));
  };

  const handleImdbUrlChange = (value: string) => {
    setFilm(Film => ({ ...Film, imdbUrl: value.trimStart() }));
  };

  const handleImdbIdChange = (value: string) => {
    setFilm(Film => ({ ...Film, imdbId: value.trimStart() }));
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    onAdd(film);
    setCount(number => number + 1);

    setFilm(INITIAL_VALUES);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={film.title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={film.description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={film.imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={film.imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={film.imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isBtnHidden}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
