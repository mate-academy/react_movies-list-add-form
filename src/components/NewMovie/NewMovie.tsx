import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    };

    onAdd(newMovie);
    setCount(state => state + 1);
  };

  const isCorrect = () => {
    return !!newTitle && !!newImgUrl && !!newImdbUrl && !!newImdbId;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
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
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isCorrect()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
