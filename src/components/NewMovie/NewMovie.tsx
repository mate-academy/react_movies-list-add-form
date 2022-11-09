import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isButtonDisabled = () => {
    const {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    } = newMovie;

    return (!title || !imdbId || !imdbUrl || !imgUrl);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        onAdd(newMovie);
        setCount((prev) => prev + 1);
      }}
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
            disabled={isButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
