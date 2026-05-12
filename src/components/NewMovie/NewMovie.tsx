import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setmdbId] = useState('');

  const [count, setCount] = useState(0);
  const isValid = title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const habdleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ title, imgUrl, description, imdbUrl, imdbId })
    setCount(count + 1)
    setTitle('');
    setImgUrl('')
    setDescription('')
    setImdbUrl('')
    setmdbId('')
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={habdleSubmit}
      >
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
        required
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
        onChange={setmdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
