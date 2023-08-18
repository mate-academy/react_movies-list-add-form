import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
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

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie: Movie = {
      ...newMovie,
    };

    onAdd(movie);
    resetForm();
    setCount(count + 1);
  };

  const submitDisabled = (
    !newMovie.title.trim()
    || !newMovie.imdbUrl.trim()
    || !newMovie.imgUrl.trim()
    || !newMovie.imdbId.trim()
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
