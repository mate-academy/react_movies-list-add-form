import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrl = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbId = (newValue: string) => {
    setImdbId(newValue);
  };

  const handleSumit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      return;
    } else {
      const newMovie: Movie = { title, description, imgUrl, imdbUrl, imdbId };

      onAdd(newMovie);
      setCount(currentCount => currentCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSumit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imdbId || !imdbUrl || !imgUrl}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
