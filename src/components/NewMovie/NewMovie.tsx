import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');
  const [count, setCount] = useState('');
  const [disabledState, setDisabledState] = useState(true);

  const checkIfAllFieldsFilled = () => {
    if (title && imgUrl && imdbUrl && imdbId) {
      setDisabledState(false);
    } else {
      setDisabledState(true);
    }
  };

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    checkIfAllFieldsFilled();
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    checkIfAllFieldsFilled();
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    checkIfAllFieldsFilled();
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
    checkIfAllFieldsFilled();
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
            disabled={disabledState}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
