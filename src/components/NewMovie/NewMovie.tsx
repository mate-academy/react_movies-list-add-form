import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const requiredCompleted = title && imgUrl && imdbUrl && imdbId;

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(0);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!requiredCompleted) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
    setCount(1);
  };

  const handleTitleChange
  = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange
  = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange
  = (newValue: string) => {
    setImgUrl(newValue);
  };

  const handleImdbUrlChange
  = (newValue: string) => {
    setImdbUrl(newValue);
  };

  const handleImdbIdChange
  = (newValue: string) => {
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
        // value=""
        value={title}
        // onChange={() => {}}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        // value=""
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        // value=""
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        // value=""
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        // value=""
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
            disabled={!requiredCompleted}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
