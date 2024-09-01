import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitle = (value: string) => {
    setTitle(value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleImgUrl = (value: string) => {
    setImgUrl(value);
  };

  const handleImdbUrl = (value: string) => {
    setImdbUrl(value);
  };

  const handleImdbId = (value: string) => {
    setImdbId(value);
  };

  const isEmptyFields = !title || !imdbId || !imdbUrl || !imgUrl;

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imdbId,
      imgUrl,
      imdbUrl,
    });

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isEmptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
