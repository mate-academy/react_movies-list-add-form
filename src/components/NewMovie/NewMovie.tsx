import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (
    movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, newCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const handleFormSubmit = (element: FormEvent) => {
    element.preventDefault();

    const movie = {
      title: newTitle.trim(),
      description: newDescription.trim(),
      imgUrl: newImgUrl.trim(),
      imdbUrl: newImdbUrl.trim(),
      imdbId: newImdbId.trim(),
    };

    onAdd(movie);
    newCount(count + 1);
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(newValue) => {
          setNewTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(newValue) => {
          setNewDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(newValue) => {
          setNewImgUrl(newValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(newValue) => {
          setNewImdbUrl(newValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(newValue) => {
          setNewImdbId(newValue);
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
