import { useState, FC } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [hasInvalidUrl, setHasInvalidUrl] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const isDisabled = [
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  ].some(field => /^\s*$/.test(field))
  || hasInvalidUrl;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        onAdd(newMovie);
        setCount(state => state + 1);
        resetForm();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={(newValue: string) => (
          setTitle(newValue)
        )}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => (
          setDescription(newValue)
        )}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        checkUrl={(check: boolean) => setHasInvalidUrl(check)}
        onChange={(newValue: string) => {
          setImgUrl(newValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        checkUrl={(check: boolean) => setHasInvalidUrl(check)}
        onChange={(newValue: string) => {
          setImdbUrl(newValue);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(newValue: string) => (
          setImdbId(newValue)
        )}
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
