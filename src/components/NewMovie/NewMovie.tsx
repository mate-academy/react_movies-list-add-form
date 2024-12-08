import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, settitle] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imgUrlimdbUrl, setimgUrlimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const isValidFields = title && imgUrl && imgUrlimdbUrl && imdbId;

  const resetForm = () => {
    settitle('');
    setDescriptionValue('');
    setimgUrl('');
    setimgUrlimdbUrl('');
    setimdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidFields) {
      onAdd({
        title: title.trim(),
        description: descriptionValue.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imgUrlimdbUrl.trim(),
        imdbId: imdbId.trim(),
      });
      resetForm();
      setCount(current => current + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={settitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imgUrlimdbUrl}
        onChange={setimgUrlimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setimdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
