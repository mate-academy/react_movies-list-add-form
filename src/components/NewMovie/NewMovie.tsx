import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const defaultMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState<Movie>(defaultMovie);

  const isFormFilled = (movie.title.trim() && movie.imgUrl.trim()
  && movie.imdbUrl.trim() && movie.imdbId.trim());

  const clearForm = () => {
    setMovie(defaultMovie);
  };

  const handleSubmit = () => {
    onAdd(movie);

    setCount(currentCount => (currentCount + 1));

    clearForm();
  };

  const handleChangeMovieProp = (
    event: React.ChangeEvent<HTMLInputElement>,
    moviePropName: string,
  ) => (
    setMovie(preMovie => ({ ...preMovie, [moviePropName]: event.target.value }))
  );

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
        onChange={handleChangeMovieProp}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChangeMovieProp}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChangeMovieProp}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChangeMovieProp}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChangeMovieProp}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
