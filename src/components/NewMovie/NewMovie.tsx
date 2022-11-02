import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setNewTitle] = useState('');
  const [description, setNewDescription] = useState('');
  const [imgUrl, setNewImgUrl] = useState('');
  const [imdbUrl, setNewImdbUrl] = useState('');
  const [imdbId, setNewImdbId] = useState('');

  const isEmptyField = !title || !imgUrl || !imdbUrl || !imdbId;

  const increaseCount = () => {
    setCount(current => current + 1);
  };

  const clearForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const addMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    increaseCount();
    clearForm();
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMovie();
  }

  const validateForm = (value: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return !value.match(pattern);
  };

  return (
    <form
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setNewTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setNewDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setNewImgUrl(event)}
        required
        isValid={validateForm}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setNewImdbUrl(event)}
        required
        isValid={validateForm}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setNewImdbId(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleFormSubmit}
            disabled={isEmptyField}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
