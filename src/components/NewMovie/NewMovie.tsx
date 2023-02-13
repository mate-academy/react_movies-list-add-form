import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [titleInput, setTitleInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [imgUrlInput, setimgUrlInput] = useState('');
  const [imdbUrlInput, setImdbUrlInput] = useState('');
  const [imdbIdInput, setImdbIdInput] = useState('');

  const clearForm = () => {
    setTitleInput('');
    setDescInput('');
    setimgUrlInput('');
    setImdbUrlInput('');
    setImdbIdInput('');
  };

  const disableButton = !titleInput
    || !imgUrlInput || !imdbUrlInput || !imgUrlInput || !imdbIdInput;

  const createNewMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: titleInput,
      description: descInput,
      imgUrl: imgUrlInput,
      imdbUrl: imdbUrlInput,
      imdbId: imdbIdInput,
    };

    onAdd(newMovie);
    clearForm();
    setCount(currentCount => currentCount + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={createNewMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleInput}
        onChange={setTitleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descInput}
        onChange={setDescInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlInput}
        onChange={setimgUrlInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlInput}
        onChange={setImdbUrlInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdInput}
        onChange={setImdbIdInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
