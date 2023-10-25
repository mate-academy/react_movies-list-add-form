import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [newMovieError, setNewMovieError] = useState({
    titleError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
  });

  const valueCheck = newMovie.title.trim() === ''
  || newMovie.imgUrl.trim() === ''
  || newMovie.imdbUrl.trim() === ''
  || newMovie.imdbId.trim() === '';

  const handleChange = (name: string, newValue: string) => {
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: newValue,
    }));
  };

  const isAddDisabled = !newMovie.title
  || !newMovie.imgUrl
  || !newMovie.imdbUrl
  || !newMovie.imdbId;

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (isAddDisabled) {
      setNewMovieError({
        titleError: true,
        imgUrlError: true,
        imdbUrlError: true,
        imdbIdError: true,
      });

      return;
    }

    onAdd(newMovie);
    setCount(count + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setNewMovieError({
      titleError: false,
      imgUrlError: false,
      imdbUrlError: false,
      imdbIdError: false,
    });
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={newMovie.title}
        label="Title"
        onChange={handleChange}
        hasError={newMovieError.titleError}
      />

      <TextField
        name="description"
        value={newMovie.description}
        label="Description"
        onChange={handleChange}
        hasError={false}
      />

      <TextField
        name="imgUrl"
        value={newMovie.imgUrl}
        label="Image URL"
        onChange={handleChange}
        hasError={newMovieError.titleError}
      />

      <TextField
        name="imdbUrl"
        value={newMovie.imdbUrl}
        label="Imdb URL"
        onChange={handleChange}
        hasError={newMovieError.titleError}
      />

      <TextField
        name="imdbId"
        value={newMovie.imdbId}
        label="Imdb ID"
        onChange={handleChange}
        hasError={newMovieError.titleError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddDisabled || valueCheck}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
