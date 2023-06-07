import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setmdbUrl] = useState('');

  const [count, setCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const resetForm = () => {
    setTitle('');
    setImdbId('');
    setImgUrl('');
    setmdbUrl('');
    setDescription('');
  };

  const handleSabmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    setCount(current => (current + 1));
    setErrorCount(0);
    resetForm();
  };

  const isFormValid = title && imdbId && imdbUrl && imgUrl && errorCount === 0;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSabmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        value={title}
        onChange={setTitle}
        setErrorCount={setErrorCount}
        required
      />

      <TextField
        name="description"
        value={description}
        onChange={setDescription}
        setErrorCount={setErrorCount}
        required
      />

      <TextField
        name="imgUrl"
        value={imgUrl}
        onChange={setImgUrl}
        setErrorCount={setErrorCount}
        required
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        onChange={setmdbUrl}
        setErrorCount={setErrorCount}
        required
      />

      <TextField
        name="imdbId"
        value={imdbId}
        onChange={setImdbId}
        setErrorCount={setErrorCount}
        required
      />

      <div className="field is-grouped is-justify-content-space-between">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
