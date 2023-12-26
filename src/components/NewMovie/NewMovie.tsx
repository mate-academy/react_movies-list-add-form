import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

function checkValidation(pattern: RegExp, url: string): boolean {
  return url === '' || pattern.test(url);
}

// eslint-disable-next-line max-len
const urlValidationPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [checkedImgUrl, setCheckedImgUrl] = useState(false);
  const [checkedImdbUrl, setCheckedImdbUrl] = useState(false);

  const isDisabled = !title
    || !imgUrl
    || !imdbUrl
    || !imdbId
    || !checkedImgUrl
    || !checkedImdbUrl;

  useEffect(() => {
    setCheckedImgUrl(
      checkValidation(urlValidationPattern, imgUrl),
    );

    setCheckedImdbUrl(
      checkValidation(urlValidationPattern, imdbUrl),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgUrl, imdbUrl]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(currentCount => currentCount + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={setTitle}
      />

      <TextField
        name="description"
        label="description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        checkValidationUrl
        checkedUrl={checkedImgUrl}
        onChange={setImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        checkValidationUrl
        checkedUrl={checkedImdbUrl}
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
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
