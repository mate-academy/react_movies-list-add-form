import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const emptyMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState(emptyMovie);
  const [incorrectUrl, setIncorrectUrl] = useState(false);

  const onChange = (value: string, name: string) => {
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const disabledSubmit = () => {
    const {
      title, imgUrl, imdbUrl, imdbId,
    } = newMovie;

    return !title || !imgUrl || !imdbUrl || !imdbId || incorrectUrl;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(newMovie);
        setCount(() => count + 1);
        setNewMovie(emptyMovie);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={onChange}
        required
        setIncorrectUrl={setIncorrectUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={onChange}
        required
        setIncorrectUrl={setIncorrectUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
