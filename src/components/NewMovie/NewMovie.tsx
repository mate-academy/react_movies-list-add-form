import { memo, useCallback, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const NewMovie = memo(({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');

  const [imdbId, setImdbId] = useState('');

  const checkUrl = (url: string) => pattern.test(url);

  const normalizedTitle = useMemo(() => title.trim(), [title]);
  const normalizedImgUrl = useMemo(() => imgUrl.trim(), [imgUrl]);
  const normalizedImdbUrl = useMemo(() => imdbUrl.trim(), [imdbUrl]);
  const normalizedImdbId = useMemo(() => imdbId.trim(), [imdbId]);

  const isImgUrlValid = useMemo(
    () => normalizedImgUrl && checkUrl(normalizedImgUrl),
    [normalizedImgUrl],
  );

  const isImdbUrlValid = useMemo(
    () => normalizedImdbUrl && checkUrl(normalizedImdbUrl),
    [normalizedImdbUrl],
  );

  const isFormValid = useMemo(
    () =>
      normalizedTitle &&
      normalizedImgUrl &&
      normalizedImdbUrl &&
      normalizedImdbId &&
      isImgUrlValid &&
      isImdbUrlValid,
    [
      normalizedTitle,
      normalizedImgUrl,
      normalizedImdbUrl,
      normalizedImdbId,
      isImgUrlValid,
      isImdbUrlValid,
    ],
  );

  const validateUrl = useCallback(
    (fieldName: string) => (url: string) => {
      if (url && !checkUrl(url)) {
        return `${fieldName} is not valid URL`;
      }

      return '';
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onAdd({
        title: normalizedTitle,
        description: description.trim(),
        imgUrl: normalizedImgUrl,
        imdbUrl: normalizedImdbUrl,
        imdbId: normalizedImdbId,
      });

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');

      setCount(prevCount => prevCount + 1);
    },
    [
      onAdd,
      normalizedTitle,
      description,
      normalizedImgUrl,
      normalizedImdbUrl,
      normalizedImdbId,
    ],
  );

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
        onChange={setImgUrl}
        validate={validateUrl('Image URL')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validate={validateUrl('Imdb URL')}
        required
      />

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
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});

NewMovie.displayName = 'NewMovie';

export { NewMovie };
