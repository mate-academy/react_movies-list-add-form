import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');

  const areInputsValid = (title && imgUrl && imdbUrl && imdbId);

  const newMovie = {
    title, description, imgUrl, imdbUrl, imdbId,
  };

  const increaseCount = () => {
    setCount(oldCount => oldCount + 1);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!areInputsValid) {
      return;
    }

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbURL('');
    setImdbId('');

    increaseCount();
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
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description (optional)"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbURL}
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
            disabled={!areInputsValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
