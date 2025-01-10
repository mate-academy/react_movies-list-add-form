import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlError, setImgUrlError] = useState<string | null>(null);
  const [imdbUrlError, setImdbUrlError] = useState<string | null>(null);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setImgUrlError(null);
    setImdbUrlError(null);
    setCount(prev => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    const pattern = new RegExp(
      '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,w]+@)?[A-Za-z0-9.-]+|(?:www.|' +
        '[-;:&=+$,w]+@)[A-Za-z0-9.-]+)' +
        '((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?' +
        '(?:[,.!/\\\\\\w]*))?)$',
    );

    const isImgUrlValid = pattern.test(imgUrl);
    const isImdbUrlValid = pattern.test(imdbUrl);

    setImgUrlError(isImgUrlValid ? null : 'Invalid Image URL');
    setImdbUrlError(isImdbUrlValid ? null : 'Invalid IMDB URL');

    if (!isImgUrlValid || !isImdbUrlValid) {
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
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => {
          setImgUrl(value);
          setImgUrlError(null);
        }}
        required
      />
      {imgUrlError && <p className="help is-danger">{imgUrlError}</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
          setImdbUrlError(null);
        }}
        required
      />
      {imdbUrlError && <p className="help is-danger">{imdbUrlError}</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
