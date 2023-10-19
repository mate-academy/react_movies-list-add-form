import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleUpdate = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionUpdate = (newValue: string) => {
    setDescription(newValue);
  };

  const handleimgUrlUpdate = (newValue: string) => {
    setimgUrl(newValue);
  };

  const handleImdbUrlUpdate = (newValue: string) => {
    setimdbUrl(newValue);
  };

  const handleImdbIdUpdate = (newValue: string) => {
    setImdbId(newValue);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);

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
        onChange={handleTitleUpdate}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionUpdate}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleimgUrlUpdate}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlUpdate}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdUpdate}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {!title || !imgUrl || !imdbUrl || !imdbId ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
