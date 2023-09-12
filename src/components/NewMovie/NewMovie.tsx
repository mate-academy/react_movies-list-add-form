import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, seDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setSmdbId] = useState('');
  const [imgError, setImgError] = useState(false);
  const [imdbError, setImdbError] = useState(false);

  const reset = () => {
    setTitle('');
    seDescription('');
    setImgUrl('');
    setImdbUrl('');
    setSmdbId('');
    setImgError(false);
    setImdbError(false);
  };

  const urlRegex = /^(https?:\/\/)?(www\.)?[A-Za-z\d.-]+\.\w{2,6}\/?([^\s]*)?$/;

  const handlSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    if (!urlRegex.test(imgUrl) || !urlRegex.test(imdbUrl)) {
      setImgError(!urlRegex.test(imgUrl));
      setImdbError(!urlRegex.test(imdbUrl));

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

    setCount((prevCount) => prevCount + 1);
  };

  const disabled = title && imgUrl && imdbUrl && imdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlSubmit}
    >
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
        onChange={seDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      {imgError && (
        <div>
          <p className="help is-danger">Please enter valid URL for Img</p>
        </div>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      {imdbError && (
        <div>
          <p className="help is-danger">Please enter valid URL for Imdb</p>
        </div>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setSmdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
