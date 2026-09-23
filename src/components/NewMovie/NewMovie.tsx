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

  const isValidUrl = (value: string): string => {
    if (!value) {
      return '';
    }

    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(value) ? '' : 'Please enter a valid URL';
  };

  const canSubmit =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    !isValidUrl(imgUrl) &&
    imdbUrl.trim() !== '' &&
    !isValidUrl(imdbUrl) &&
    imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({ title, description, imgUrl, imdbUrl, imdbId });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(current => current + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        onBlur={() => setTitle(current => current.trim())}
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
        onChange={setImgUrl}
        onBlur={() => setImgUrl(current => current.trim())}
        validate={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => setImdbUrl(current => current.trim())}
        validate={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => setImdbId(current => current.trim())}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
