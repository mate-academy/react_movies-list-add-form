import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isAddButtonDisabled = (): boolean => {
    if (
      newMovie.title &&
      newMovie.imgUrl &&
      newMovie.imdbUrl &&
      newMovie.imdbId
    ) {
      return false;
    }

    return true;
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);

    setCount(count + 1);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => setNewMovie({ ...newMovie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => setNewMovie({ ...newMovie, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
