import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movieToAdd: Movie) => void;
}

export const NewMovie: React.FC <Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const clearForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const validateTextField = (textField: string): string => textField.trim();

  const canUseButton = () => {
    return (
      validateTextField(newTitle)
      && validateTextField(newImgUrl)
      && validateTextField(newImdbUrl)
      && validateTextField(newImdbId)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: validateTextField(newTitle),
      description: validateTextField(newDescription),
      imgUrl: validateTextField(newImgUrl),
      imdbUrl: validateTextField(newImdbUrl),
      imdbId: validateTextField(newImdbId),
    };

    onAdd(newMovie);
    setCount((prevCount) => prevCount + 1);
    clearForm();
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
        onChange={(newValue) => setNewTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(newValue) => setNewDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(newValue) => setNewImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(newValue) => setNewImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(newValue) => setNewImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {canUseButton()
            ? (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                data-cy="submit-button"
                className="button is-link"
                disabled
              >
                Add
              </button>
            )}
        </div>
      </div>
    </form>
  );
};
