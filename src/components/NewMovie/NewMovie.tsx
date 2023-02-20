import { useState, useEffect } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movieNew: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaulData = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState(false);
  const [movie, setTitle] = useState(defaulData);

  const clearMovie = () => {
    setTitle(defaulData);
  };

  useEffect(() => {
    if (
      movie.title.trim()
      && movie.description.trim()
      && movie.imgUrl.trim()
      && movie.imdbUrl.trim()
      && movie.imdbId.trim()
    ) {
      setMovieData(true);

      return;
    }

    setMovieData(false);
  },
  [
    movie.title,
    movie.description,
    movie.imgUrl,
    movie.imdbUrl,
    movie.imdbId,
  ]);

  const addNewMovie = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTitle((prev:Movie) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onAddMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    clearMovie();
    setCount(prev => prev + 1);
  };

  return (
    <form
      onSubmit={onAddMovie}
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={addNewMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={addNewMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={addNewMovie}
        required

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={addNewMovie}
        required

      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={addNewMovie}
        required

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!movieData}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
