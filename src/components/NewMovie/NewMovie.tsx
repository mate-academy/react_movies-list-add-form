import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const isAllowSubmit = Boolean(title && imgUrl && imdbUrl && imdbId) || false;

  const addMovie = () => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setCount(current => current + 1);

    onAdd(newMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(str) => setTitle(str)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(str) => setDescription(str)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(str) => setImgUrl(str)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(str) => setImdbUrl(str)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(str) => setImdbId(str)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllowSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
