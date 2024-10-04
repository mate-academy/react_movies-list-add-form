import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlPattern } from '../../utils/consts/RegEx';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, imgUrl, imdbUrl, imdbId, description } = newMovie;

  const isValidInputs =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [event.target.name]: event.target.value,
    }));
  };

  const validateUrl = (value: string) => {
    return !urlPattern.test(value) && 'Invalid URL format';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidInputs) {
      return;
    }

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd(newMovie);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInput}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInput}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInput}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidInputs}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
