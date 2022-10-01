import { useState, FC, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount((prev) => prev + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isError = !title.trim()
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
        label="Title"
        name="title"
        onChange={setTitle}
        required
        value={title}
      />

      <TextField
        label="Description"
        name="description"
        onChange={setDescription}
        value={description}
      />

      <TextField
        label="Image URL"
        name="imgUrl"
        onChange={setImgUrl}
        required
        value={imgUrl}
      />

      <TextField
        label="Imdb URL"
        name="imdbUrl"
        onChange={setImdbUrl}
        required
        value={imdbUrl}
      />

      <TextField
        label="Imdb ID"
        name="imdbId"
        onChange={setImdbId}
        required
        value={imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
