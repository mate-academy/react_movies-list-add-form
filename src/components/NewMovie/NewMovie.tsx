import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isError = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

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
        onChange={(movieTitle) => setTitle(movieTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(moveDiscribtion) => setDescription(moveDiscribtion)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(movieImgUrl) => setImgUrl(movieImgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(movieImdbUrl) => setImdbUrl(movieImdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(movieImdbId) => setImdbId(movieImdbId)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
