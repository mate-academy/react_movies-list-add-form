import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Prop = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie = ({ onAdd }: Prop) => {
  const [count, setCount] = useState(0);
  const [title, setTile] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const emptyForms = title === ''
    || imgUrl === ''
    || imdbUrl === ''
    || imdbId === '';

  const reset = () => {
    setTile('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
  };

  function sendInfo(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    setCount(count + 1);
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    reset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={sendInfo}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTile}
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
            disabled={emptyForms}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
