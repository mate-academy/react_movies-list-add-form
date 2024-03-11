import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

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

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  let disabledSubmit = true;

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  if (
    newMovie.title.trim() &&
    newMovie.imgUrl.trim() &&
    newMovie.imdbUrl.trim() &&
    newMovie.imdbId.trim()
  ) {
    disabledSubmit = false;
  }

  const onSumbitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !newMovie.title &&
      !newMovie.imgUrl &&
      !newMovie.imdbUrl &&
      !newMovie.imdbId
    ) {
      return;
    }

    onAdd(newMovie);
    setCount(current => current + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={e => {
        setCount(count + 1);
        onSumbitHandler(e);
      }}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setNewMovie({ ...newMovie, title: value })}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setNewMovie({ ...newMovie, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
