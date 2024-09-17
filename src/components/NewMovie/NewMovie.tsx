import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const movieTemplate = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [newMovie, setNewMovie] = useState<Movie>(movieTemplate);

  const handleNewMovieChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie(renderMovie => ({ ...renderMovie, [name]: value }));
  };

  const reset = () => setNewMovie(movieTemplate);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(count + 1);
    onAdd(newMovie);
    reset();
  };

  const pattern = new RegExp(
    `^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$`,
  );

  const isValideURL = (value: string) => pattern.test(value);

  const buttonIsValid =
    newMovie.title.trim() &&
    isValideURL(newMovie.imgUrl.trim()) &&
    isValideURL(newMovie.imdbUrl.trim()) &&
    newMovie.imdbId.trim();

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleNewMovieChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleNewMovieChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleNewMovieChange}
        required
        checkURL={isValideURL}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleNewMovieChange}
        required
        checkURL={isValideURL}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleNewMovieChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!buttonIsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
