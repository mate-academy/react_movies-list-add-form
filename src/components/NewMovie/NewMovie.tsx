import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImgURL, setNewImgURL] = useState('');
  const [newImdbURL, setNewImdbURL] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const reset = () => {
    setNewTitle('');
    setNewDesc('');
    setNewImgURL('');
    setNewImdbURL('');
    setNewImdbId('');
    setCount(current => current + 1);
  };

  const handleAdding = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: newTitle,
      description: newDesc,
      imgUrl: newImgURL,
      imdbUrl: newImdbURL,
      imdbId: newImdbId,
    };

    onAdd(newMovie);

    reset();
  };

  const isBtnEnabled = newTitle.trim()
    && newImgURL.trim()
    && newImdbURL.trim()
    && newImdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdding}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(event) => setNewTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDesc}
        onChange={(event) => setNewDesc(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgURL}
        onChange={(event) => setNewImgURL(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbURL}
        onChange={(event) => setNewImdbURL(event)}
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
            disabled={!isBtnEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
