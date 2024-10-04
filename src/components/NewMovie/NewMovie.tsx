import { useState, FC, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (Movie: Movie) => void;
}

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const isReadyToSubmit = newTitle && newImgUrl && newImdbUrl && newImdbId;

  const newMovie: Movie = {
    title: newTitle,
    description: newDescription,
    imgUrl: newImgUrl,
    imdbUrl: newImdbUrl,
    imdbId: newImdbId,
  };

  function handleFormReset() {
    setNewDescription('');
    setNewImdbId('');
    setNewImdbUrl('');
    setNewImgUrl('');
    setNewTitle('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setCount(current => current + 1);

    onAdd(newMovie);

    handleFormReset();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={value => setNewTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={value => setNewDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={value => setNewImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={value => setNewImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={value => setNewImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
