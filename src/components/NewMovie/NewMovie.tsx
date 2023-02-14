import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imbdUrl, setImbdUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  const createNewMovie = {
    title,
    description,
    imgUrl: imageUrl,
    imdbUrl: imbdUrl,
    imdbId: imbdId,
  };

  // eslint-disable-next-line no-useless-escape, max-len
  const pattern = '/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/';

  const isValidUrl = (value: string) => value.includes(pattern);

  const removeField = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImbdUrl('');
    setImbdId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(createNewMovie);

    removeField();

    if (!isValidUrl(imageUrl) || !isValidUrl(imbdUrl)) {
      setImageUrl(!isValidUrl(imbdUrl) ? 'Invalid url' : imageUrl);
      setImbdUrl(!isValidUrl(imageUrl) ? 'Invalid url' : imbdUrl);
    }

    setCount(current => current + 1);
  };

  const submitBtnUnabled = title && imageUrl && imbdId && imbdUrl;

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imbdUrl}
        onChange={setImbdUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imbdId}
        onChange={setImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!submitBtnUnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
