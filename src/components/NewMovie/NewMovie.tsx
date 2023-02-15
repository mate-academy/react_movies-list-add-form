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
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imbdId, setImbdId] = useState('');

  const createNewMovie = {
    title,
    description,
    imgUrl: imgUrl,
    imdbUrl: imdbUrl,
    imdbId: imbdId,
  };

  // eslint-disable-next-line no-useless-escape, max-len
  const pattern = '/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/';

  const isValidUrl = (value: string) => value.includes(pattern);

  const removeField = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImbdId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(createNewMovie);

    removeField();

    if (!isValidUrl(imgUrl) || !isValidUrl(imdbUrl)) {
      setimgUrl(!isValidUrl(imdbUrl) ? 'Invalid url' : imgUrl);
      setimdbUrl(!isValidUrl(imgUrl) ? 'Invalid url' : imdbUrl);
    }

    setCount(current => current + 1);
  };

  const submitBtnUnabled = title && imgUrl && imbdId && imdbUrl;

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
        value={imgUrl}
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
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
