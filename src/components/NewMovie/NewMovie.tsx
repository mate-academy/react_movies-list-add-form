import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  let visibleButton = false;

  const handleTextfieldChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionField = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlField = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleImdbUrlField = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbIdField = (newValue: string) => {
    setImdbId(newValue);
  };

  const resetForm = () => {
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setDescription('');
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(count + 1);
    resetForm();
  };

  if (title && imgUrl && imdbUrl && imdbId) {
    visibleButton = true;
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTextfieldChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!visibleButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
