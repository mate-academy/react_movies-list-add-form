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
  const [imdbId, setImdbId] = useState('');

  const isRequired = () => {
    if (title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setCount(count + 1);
    reset();

    onAdd(movie);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        onChange={setDescription}
        name="description"
        label="Description"
        value={description}
      />

      <TextField
        onChange={setImgUrl}
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
      />

      <TextField
        onChange={setImdbUrl}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
      />

      <TextField
        onChange={setImdbId}
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            onClick={handleSubmit}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isRequired()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
