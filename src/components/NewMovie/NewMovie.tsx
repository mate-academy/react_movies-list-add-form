import { useState, FormEvent } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import validateUrl from '../../validateUrl';

interface Props {
  onAdd: (moivie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isValid = () => {
    return !title || !validateUrl(imgUrl) || !validateUrl(imdbUrl) || !imdbId;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    clearForm();

    setCount(currentCount => currentCount + 1);
  };

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
        onChange={setTitle}
        required
        isValid={!title}
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
        isValid={!validateUrl(imgUrl)}
        invalidMessage="must be valid"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        isValid={!validateUrl(imgUrl)}
        invalidMessage="must be valid"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        isValid={!imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
