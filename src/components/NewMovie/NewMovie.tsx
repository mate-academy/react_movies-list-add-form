import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie:Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageURL, setNewImageURL] = useState('');
  const [newURL, setNewURL] = useState('');
  const [newId, setNewId] = useState('');

  const reset = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImageURL('');
    setNewURL('');
    setNewId('');
  };

  const disable = !newTitle || !newImageURL || !newId || !newURL || !newId;

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let updCaunt = count;

    setCount(updCaunt += 1);

    if (disable) {
      return;
    }

    onAdd({
      title: newTitle,
      description: newDescription,
      imgUrl: newImageURL,
      imdbUrl: newURL,
      imdbId: newId,
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerSubmit}
      onReset={reset}
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
        value={newImageURL}
        onChange={(value) => {
          setNewImageURL(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newURL}
        onChange={(value) => {
          setNewURL(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newId}
        onChange={(value) => {
          setNewId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
