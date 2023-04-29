import { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: CallableFunction;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const addNewMovie = (key: string, value: string) => {
    setMovie({
      ...movie,
      [key]: value,
    });
  };

  const isButtonDisabled = () => {
    return (
      !movie.title
      || !movie.imgUrl
      || !movie.imdbUrl
      || !movie.imdbId
    );
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(movie);
        setMovie({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
        setCount(count + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={addNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={addNewMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
