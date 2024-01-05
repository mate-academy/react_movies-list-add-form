import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(currentCount => currentCount + 1);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie: Movie) => ({ ...prevMovie, [name]: value }));
  };

  const validation = () => {
    return !(!newMovie.title
      || !newMovie.imdbId
      || !newMovie.imdbUrl
      || !newMovie.imgUrl
    );
  };

  const isValid = validation();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={event => handleOnChange(event)}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={event => handleOnChange(event)}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={event => handleOnChange(event)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={event => handleOnChange(event)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={event => handleOnChange(event)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
