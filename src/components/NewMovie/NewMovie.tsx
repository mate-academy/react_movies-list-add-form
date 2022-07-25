import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const newMovie: Movie = {
    title: newTitle,
    description: newDescription,
    imgUrl: newImgUrl,
    imdbUrl: newImdbUrl,
    imdbId: newImdbId,
  };

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const formIsFilled = title && imgUrl && imdbUrl && imdbId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formIsFilled) {
      onAdd(newMovie);
    }

    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
    setCount(Math.random());
  };

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
        onChange={(value) => {
          setNewTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(value) => {
          setNewDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(value) => {
          setNewImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(value) => {
          setNewImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(value) => {
          setNewImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        {formIsFilled && (
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          </div>
        )}

      </div>
    </form>
  );
};
