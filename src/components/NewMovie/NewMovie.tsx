import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { useState } from 'react';

export const NewMovie: React.FC<{ onAdd: (movie: Movie) => void }> = ({
  onAdd,
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onAdd({
      title: newTitle.trim(),
      description: newDescription.trim(),
      imgUrl: newImgUrl.trim(),
      imdbUrl: newImdbUrl.trim(),
      imdbId: newImdbId.trim(),
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={v => {
          setNewTitle(v);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={v => {
          setNewDescription(v);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={v => {
          setNewImgUrl(v);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={v => {
          setNewImdbUrl(v);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={v => {
          setNewImdbId(v);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!newTitle || !newImgUrl || !newImdbUrl || !newImdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
