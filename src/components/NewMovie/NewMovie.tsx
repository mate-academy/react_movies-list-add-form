import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

type Method = (value: string | ((prevTitle: string) => string)) => void;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  let isDisabled = true;

  const setStartValue = (method: Method) => {
    const startValue = '';

    method(startValue);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setStartValue(setTitle);
    setStartValue(setDescription);
    setStartValue(setImgUrl);
    setStartValue(setImdbUrl);
    setStartValue(setImdbId);
    setCount(count + 1);
    onAdd(newMovie);
  };

  const isMatch = (url: string) => {
    const pattern = new RegExp([
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+',
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
      '((?:\\/[+~%\\/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?',
      '(?:[,.!/\\\\\\w]*))?)$',
    ].join(''));

    return pattern.test(url.trim());
  };

  if (title
    && imgUrl && imdbId && imdbUrl && isMatch(imdbUrl) && isMatch(imgUrl)) {
    isDisabled = !isDisabled;
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        url={imgUrl}
        isMatch={isMatch(imgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        url={imdbUrl}
        isMatch={isMatch(imdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
