import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMoviesProps {
  onAdd: React.Dispatch<React.SetStateAction<Movie[]>>;
}

export const NewMovie: React.FC<NewMoviesProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const isDisabled = !(title.trim() && imdbId.trim()
    && imdbUrl.trim() && imgUrl.trim());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(oldMoviesList => [...oldMoviesList, newMovie]);
    setCount(prevCount => prevCount + 1);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setNewMovie}
        required
        count={count}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setNewMovie}
        count={count}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setNewMovie}
        required
        count={count}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setNewMovie}
        required
        count={count}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setNewMovie}
        required
        count={count}
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
