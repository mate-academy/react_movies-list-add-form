import { useState, FC } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie:FC<Props> = ({ onAdd }) => {
  const emptyMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(emptyMovie);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movie;

  const handleMovieChange = (value:string, name:string) => {
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setCount(prevcount => prevcount + 1);
    setMovie(emptyMovie);
  };

  const hideButton = !title || !imgUrl || !imdbUrl || !imdbId;

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
        value={title}
        onChange={(value) => handleMovieChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleMovieChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(value) => handleMovieChange(value, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(value) => handleMovieChange(value, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(value) => handleMovieChange(value, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hideButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
