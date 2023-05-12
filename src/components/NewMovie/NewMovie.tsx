import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

// eslint-disable-next-line max-len
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageURL, setNewImageURL] = useState('');
  const [newImdbURL, setNewImdbURL] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie: Movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImageURL,
      imdbUrl: newImdbURL,
      imdbId: newImdbId,
    };

    setCount(current => current + 1);
    onAdd(movie);
    setNewTitle('');
    setNewDescription('');
    setNewImageURL('');
    setNewImdbURL('');
    setNewImdbId('');
  };

  const urlValidation = (url: string): boolean => {
    return urlPattern.test(url);
  };

  const isDisabled
    = newTitle.trim()
    && urlValidation(newImageURL)
    && urlValidation(newImdbURL)
    && newImdbId.trim();

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
        value={newTitle}
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
        value={newImageURL}
        required
        onChange={setNewImageURL}
        validated={urlValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbURL}
        required
        onChange={setNewImdbURL}
        validated={urlValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        required
        onChange={setNewImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
