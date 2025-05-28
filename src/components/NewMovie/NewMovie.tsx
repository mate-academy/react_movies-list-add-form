import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newTitile, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const isFormValid =
    newTitile.trim() &&
    newImgUrl.trim() &&
    newImdbUrl.trim() &&
    newImdbId.trim();

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: newTitile.trim(),
      description: newDescription.trim(),
      imgUrl: newImgUrl.trim(),
      imdbUrl: newImdbUrl.trim(),
      imdbId: newImdbId.trim(),
    };

    onAdd(newMovie);

    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');

    setCount(current => current + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSumbit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitile}
        onChange={setNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={setNewDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={setNewImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={setNewImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
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
