import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({
  onAdd = () => { },
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const handleTitleChange = (newValue: string) => (
    setTitle(newValue)
  );
  const [description, setDescription] = useState('');
  const handleDescriptionChange = (newValue: string) => (
    setDescription(newValue)
  );
  const [imgUrl, setImgUrl] = useState('');
  const handleImgUrlChange = (newValue: string) => (
    setImgUrl(newValue)
  );
  const [imdbUrl, setImdbUrl] = useState('');
  const handleImdbUrlChange = (newValue: string) => (
    setImdbUrl(newValue)
  );
  const [imdbId, setImdbId] = useState('');
  const handleImdbIdChange = (newValue: string) => (
    setImdbId(newValue)
  );
  const buttonDisabled: boolean = !title
    || !imgUrl
    || !imdbUrl
    || !imdbId;

  const handleSubmit = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(currCount => (currCount + 1));

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
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
            disabled={buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
