import './NewMovie.scss';
import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

/* eslint-disable */
const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
/* eslint-enable */

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [count, setCount] = useState(0);

  const isValidUrl = (url: string): boolean => urlPattern.test(url);
  const hasOnlySpaces = (string: string): boolean => /^\s*$/.test(string);

  const movie = {
    title: title.trim(),
    description: description.trim(),
    imgUrl: imgUrl.trim(),
    imdbUrl: imdbUrl.trim(),
    imdbId: imdbId.trim(),
  };

  const checkForm = Boolean(
    !hasOnlySpaces(title)
    && !hasOnlySpaces(imgUrl)
    && !hasOnlySpaces(imdbUrl)
    && !hasOnlySpaces(imdbId),
  );

  const handleSumbit
    = (event: React.FormEvent) => {
      event.preventDefault();

      if (!isValidUrl(movie.imgUrl)) {
        setImgUrlError(true);
      } else if (!isValidUrl(movie.imdbUrl)) {
        setImdbUrlError(true);
      } else {
        setImgUrlError(false);
        setImdbUrlError(false);
        onAdd(movie);

        setCount(x => (x + 1));

        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');
      }
    };

  return (
    <form
      onSubmit={handleSumbit}
      className="NewMovie"
      key={count}
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
        urlError={imgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        urlError={imdbUrlError}
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
            disabled={!checkForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
