import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

const emptyMovie = {
  title: '',
  description: '',
  imdbUrl: '',
  imgUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(emptyMovie);
  // eslint-disable-next-line object-curly-newline
  const { title, description, imdbId, imdbUrl, imgUrl } = movie;
  const isDisabled: boolean = !title || !imdbId || !imdbUrl || !imgUrl;

  const setProperty = (property: string, value: string) => {
    setMovie(prevState => ({
      ...prevState,
      [property]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(e) => {
        e.preventDefault();
        setCount(count + 1);
        onAdd(movie);
        setMovie(emptyMovie);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setProperty('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setProperty('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setProperty('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setProperty('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setProperty('imdbId', value)}
        required
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
