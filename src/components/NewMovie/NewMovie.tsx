import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleMovieData = (newValue: string, key: string) => {
    return setMovie({
      ...movie,
      [key]: newValue,
    });
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const isSubmitDisable
    = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

  function reset() {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const submit = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(currentCount => currentCount + 1);

    reset();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleMovieData}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleMovieData}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleMovieData}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleMovieData}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleMovieData}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isSubmitDisable}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={submit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
