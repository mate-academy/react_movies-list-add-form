import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}
export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setNewTitle] = useState('');
  const [description, setNewDescription] = useState('');
  const [imgUrl, setNewImgUrl] = useState('');
  const [imdbUrl, setNewImdbUrl] = useState('');
  const [imdbId, setNewImdbId] = useState('');

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    onAdd(newMovie);
    setCount(currentCount => currentCount + 1);
    resetForm();
  };

  const isDisabled = !title.trim()
    || !imgUrl.trim()
    || !imdbUrl.trim()
    || !imdbId.trim();

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
        onChange={setNewTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setNewDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setNewImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setNewImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setNewImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
