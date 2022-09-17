import { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(count + 1);
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isError = !title || !description || !imgUrl || !imdbUrl || !imdbId;

  const handleTitle = (value: string) => {
    setTitle(value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleImgUrl = (value: string) => {
    setImageUrl(value);
  };

  const handleImdbUrl = (value: string) => {
    setImdbUrl(value);
  };

  const handleImdbId = (value: string) => {
    setImdbId(value);
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
        onChange={(value: string) => handleTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value: string) => handleDescription(value)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value: string) => handleImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value: string) => handleImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value: string) => handleImdbId(value)}
        required
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
