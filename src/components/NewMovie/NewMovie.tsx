import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDesctiption] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetFields = () => {
    setTitle('');
    setDesctiption('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleImgUrlError = () => {
    return !imgUrl.trim().match(pattern);
  };

  const handleImdbUrlError = () => {
    return !imdbUrl.trim().match(pattern);
  };

  const addButtonDisabler = () => {
    return !title || !imgUrl || !imdbUrl || !imdbId
      || handleImgUrlError()
      || handleImdbUrlError();
  };

  const handleSubmit = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount((prevCount) => {
      return prevCount + 1;
    });

    resetFields();
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
        onChange={(newTitle) => setTitle(newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => setDesctiption(newDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newImgUrl) => setImgUrl(newImgUrl)}
        required
        handleImgUrlError={() => handleImgUrlError()}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newImdbUrl) => setImdbUrl(newImdbUrl)}
        required
        handleImdbUrlError={() => handleImdbUrlError()}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId) => setImdbId(newImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={addButtonDisabler()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
