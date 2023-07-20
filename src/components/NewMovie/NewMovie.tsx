import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  const hasError = () => {
    return !imgUrl.trim() || !title.trim() || !imdbId.trim() || !imdbUrl.trim();
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
  };

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
