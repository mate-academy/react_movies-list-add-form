/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [error, setError] = useState('');
  const [aciveButton, setAciveButton] = useState(false);

  const isFieldsNotEmpty =
    !!title.trim() &&
    !!imgUrl.trim() &&
    !!imdbUrl.trim() &&
    !!imdbId.trim() &&
    !!imdbUrl.trim();

  const isValidImdbId = imdbUrl.includes(imdbId);

  const isFormValid = isFieldsNotEmpty && isValidImdbId;

  useEffect(() => {
    if (!isFieldsNotEmpty) {
      setError('All fields must be filled');

      return;
    }

    if (!isValidImdbId) {
      setError('Imdb URL must include Imdb ID');

      return;
    }

    setError('');
    setAciveButton(false);
  }, [isFormValid, isValidImdbId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(current => current + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={aciveButton}
            onClick={() => {
              if (!isFormValid) {
                setAciveButton(true);
              }
            }}
          >
            Add
          </button>
        </div>
      </div>

      {aciveButton && <div className="field is-danger">{error}</div>}
    </form>
  );
};
