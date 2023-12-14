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

  const handleFilmFieldChange = (
    field: keyof typeof INITIAL_VALUES,
  ) => (value: string) => {
    setFilm({ ...film, [field]: value });
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
        onChange={handleFilmFieldChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={film.description}
        onChange={handleFilmFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={film.imgUrl}
        onChange={handleFilmFieldChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={film.imdbUrl}
        onChange={handleFilmFieldChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={film.imdbId}
        onChange={handleFilmFieldChange('imdbId')}
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
