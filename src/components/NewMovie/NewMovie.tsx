import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultMovieData = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [newMovie, setNewMovie] = useState(
    defaultMovieData,
  );

  const resetForm = () => {
    setNewMovie(
      defaultMovieData,
    );
  };

  const handleChange = (event: string, name: string) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: event }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(event: string, name: string) => handleChange(event, name)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(event: string, name: string) => handleChange(event, name)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(event: string, name: string) => handleChange(event, name)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(event: string, name: string) => handleChange(event, name)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(event: string, name: string) => handleChange(event, name)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!newMovie.title
               || !newMovie.imgUrl
                || !newMovie.imdbUrl
                 || !newMovie.imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
