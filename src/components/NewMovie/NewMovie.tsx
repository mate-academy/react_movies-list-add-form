import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlValidity, setImgUrlValidity] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlValidity, setImdbUrlValidity] = useState(false);

  const [imdbId, setImdbId] = useState('');

  const isEmptyField = !title || !imgUrl || !imdbUrl || !imdbId;

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const urlValidation = (
    url: string,
    setValidity: (value: boolean) => void,
  ): boolean => {
    // eslint-disable-next-line max-len
    const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (urlPattern.test(url)) {
      setValidity(true);

      return true;
    }

    setValidity(false);

    return false;
  };

  const imgUrlValidation = (url: string) => {
    return urlValidation(url, setImgUrlValidity);
  };

  const imdbUrlValidation = (url: string) => {
    return urlValidation(url, setImdbUrlValidity);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={onSubmit}
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
        value={imgUrl}
        onChange={setImgUrl}
        required
        validation={imgUrlValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validation={imdbUrlValidation}
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
            disabled={isEmptyField || !imgUrlValidity || !imdbUrlValidity}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
