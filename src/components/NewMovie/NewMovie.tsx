import {
  FC,
  FormEvent,
  memo,
  useCallback,
  useState,
} from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<NewMovieProps> = memo(({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newFilm = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const shouldShowError = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      setCount((prevCount) => prevCount + 1);

      onAdd(newFilm);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    },
    [newFilm, count],
  );

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
        value={title}
        onChange={(value) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => setImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => setImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={shouldShowError}
          >
            Add Movie
          </button>
        </div>
      </div>
    </form>
  );
});
