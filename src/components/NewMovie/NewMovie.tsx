import { useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type OnAdd = (movie: Movie) => void;

interface Props {
  onAdd: OnAdd;
}

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
  const allFieldsFilled = () => {
    const {
      title, imdbId, imdbUrl, imgUrl,
    } = newMovie;

    if (title !== '' && imdbId !== '' && imdbUrl !== '' && imgUrl !== '') {
      return true;
    }

    return false;
  };

  useEffect(() => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }, [count]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(newMovie);
        setCount(() => count + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(title) => {
          setNewMovie({
            ...newMovie,
            title,
          });
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(description) => {
          setNewMovie({
            ...newMovie,
            description,
          });
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={(imgUrl) => {
          setNewMovie({
            ...newMovie,
            imgUrl,
          });
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={(imdbUrl) => {
          setNewMovie({
            ...newMovie,
            imdbUrl,
          });
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={(imdbId) => {
          setNewMovie({
            ...newMovie,
            imdbId,
          });
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
