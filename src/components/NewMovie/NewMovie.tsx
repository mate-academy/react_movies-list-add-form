import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

import { pattern } from '../../utils';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>({
    imdbId: '',
    title: '',
    imgUrl: '',
    imdbUrl: '',
    description: '',
  });

  const isFieldForm =
    newMovie.imdbId.trim() &&
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim();

  const reset = () => {
    setNewMovie({
      imdbId: '',
      title: '',
      imgUrl: '',
      imdbUrl: '',
      description: '',
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handlerSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pattern.test(newMovie.imdbUrl) || !pattern.test(newMovie.imgUrl)) {
      return;
    }

    onAdd(newMovie);
    setCount(count + 1);
    reset();
  };

  return (
    <form onSubmit={handlerSumbit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={handleChange}
        value={newMovie.description}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={handleChange}
        value={newMovie.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={handleChange}
        value={newMovie.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={handleChange}
        value={newMovie.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFieldForm ? false : true}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
