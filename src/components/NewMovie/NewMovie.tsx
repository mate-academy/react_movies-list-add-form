import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImbdId] = useState('');

  const isDisabledButton = () => {
    return !title.trim()
      || !imdbUrl.trim()
      || !imdbId.trim()
      || !imgUrl.trim();
  };

  const reset = () => {
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImbdId('');
    setDescription('');

    setCount(currentCount => currentCount + 1);
  };

  const newMovie: Movie = {
    title,
    imgUrl,
    description,
    imdbUrl,
    imdbId,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(newMovie);
    reset();
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
        onChange={event => setTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => setDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => setImgUrl(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => setImdbUrl(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => setImbdId(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabledButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
