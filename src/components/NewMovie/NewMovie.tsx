import { useState, FormEvent } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddNewMovieProp = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<AddNewMovieProp> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const submitDisabled
   = !newImgUrl.trim()
  || !newImdbUrl.trim()
  || !newImdbId.trim();

  const submitMovie = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(count + 1);

    const newMovie = {
      title: newTitle,
      description: newDescription,
      imdbUrl: newImdbUrl,
      imgUrl: newImgUrl,
      imdbId: newImdbId,
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitMovie}>
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
        required
        value={newImgUrl}
        onChange={setNewImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newImdbUrl}
        onChange={setNewImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newImdbId}
        onChange={setNewImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
