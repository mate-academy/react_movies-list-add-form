import { type FormEvent, useState } from 'react';
import { type Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Increase the count after successful form submission
  // to reset touched status of all the `TextField`s.
  const [count, setCount] = useState(0);

  const isSubmitDisabled =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    clearForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        onChange={setImgUrl}
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
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
