import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: CallableFunction,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgurl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  function checkIsAllEntered() {
    if (title && imgUrl && imdbUrl && imdbId) {
      return false;
    }

    return true;
  }

  function createMovie() {
    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  }

  function handleAddButton(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    onAdd((prevValue: Movie[]) => [...prevValue, createMovie()]);

    setTitle('');
    setDescription('');
    setImgurl('');
    setImdbUrl('');
    setImdbId('');

    setCount(count + 1);
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgurl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkIsAllEntered()}
            onClick={handleAddButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
