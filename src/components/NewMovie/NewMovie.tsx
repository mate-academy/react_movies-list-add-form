import React, { useState } from 'react';
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
  const [imgUrlHasError, setImgUrlHasError] = useState(false);
  const [imdbUrlHasError, setImdbUrlHasError] = useState(false);

  // eslint-disable-next-line max-len
  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
      '[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?' +
      '\\??(?:[-+=&;%@,.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)$',
  );

  const areUrlsValid = pattern.test(imgUrl) && pattern.test(imdbUrl);

  const isFormValid: boolean = Boolean(
    title.trim() &&
    imgUrl.trim() &&
    imdbUrl.trim() &&
    imdbId.trim() &&
    areUrlsValid,
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isImgValid = pattern.test(imgUrl);
    const isImdbValid = pattern.test(imdbUrl);

    setImgUrlHasError(!isImgValid);
    setImdbUrlHasError(!isImdbValid);

    if (!isFormValid || !isImgValid || !isImdbValid) {
      return;
    }

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

    setCount(prev => prev + 1);
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
        error={imgUrlHasError}
        errorMessage="Image URL is not valid"
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        error={imdbUrlHasError}
        errorMessage="Imdb URL is not valid"
        onChange={setImdbUrl}
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
};
