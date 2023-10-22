import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie:Movie) => void
};

const movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(
    movie,
  );

  const reset = () => {
    setNewMovie(
      movie,
    );
  };

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isDisabled = !title.trim() || !imgUrl.trim()
  || !imdbUrl.trim() || !imdbId.trim();

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let updCaunt = count;

    setCount(updCaunt += 1);

    onAdd({
      ...newMovie,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value) => {
          setNewMovie({
            ...newMovie,
            title: value,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value) => {
          setNewMovie({
            ...newMovie,
            description: value,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value) => {
          setNewMovie({
            ...newMovie,
            imgUrl: value,
          });
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value) => {
          setNewMovie({
            ...newMovie,
            imdbUrl: value,
          });
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value) => {
          setNewMovie({
            ...newMovie,
            imdbId: value,
          });
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
