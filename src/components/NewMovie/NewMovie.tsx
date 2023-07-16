import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const onInputChange = (newValue: string, name: string) => {
    setMovie(prevInput => ({
      ...prevInput,
      [name]: newValue,
    }));
  };

  const isPossibleAdding = () => {
    return (
      movie.title.trim()
        && movie.imgUrl.trim()
        && movie.imdbUrl.trim()
        && movie.imdbId.trim()
    );
  };

  const reset = () => {
    setMovie(() => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));

    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(newValue) => onInputChange(newValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newValue) => onInputChange(newValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newValue) => onInputChange(newValue, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newValue) => onInputChange(newValue, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newValue) => onInputChange(newValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isPossibleAdding()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
