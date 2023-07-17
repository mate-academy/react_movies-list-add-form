import { useState } from 'react';
import { TextField } from '../TextField';
import { MovieType } from '../Types';

type Props = {
  onAdd: (movie: MovieType) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImbdUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isUrl = (value: string) => pattern.test(value);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImbdUrl('');
    setImdbId('');
  };

  const normalizedTitle = title.trim();
  const normalizedImageUrl = imageUrl.trim();
  const normalizedImdbUrl = imdbUrl.trim();
  const normalizedimdbId = imdbId.trim();

  const handleSubmitButton = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      normalizedTitle
      && normalizedImageUrl
      && normalizedImdbUrl
      && normalizedimdbId
    ) {
      onAdd({
        title: normalizedTitle,
        description,
        imgUrl: normalizedImageUrl,
        imdbUrl: normalizedImdbUrl,
        imdbId: normalizedimdbId,
      });
      setCount(count + 1);
      reset();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmitButton}
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
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={setImageUrl}
        isUrl={isUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImbdUrl}
        isUrl={isUrl}
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
            disabled={
              !normalizedTitle
              || !normalizedImageUrl
              || !normalizedImdbUrl
              || !normalizedimdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
