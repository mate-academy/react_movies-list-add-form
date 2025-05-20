import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { on } from 'events';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(c => c + 1);
  };

  const isFormFilled = () => {
    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => setTitle(event.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => setImgUrl(e.target.value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.target.value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormFilled() ? false : true}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
