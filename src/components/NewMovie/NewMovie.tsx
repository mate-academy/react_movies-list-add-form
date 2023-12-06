import classNames from 'classnames';
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

/* eslint-disable */

const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

/* eslint-enable */

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [hasError, setHasError] = useState(false);

  const isValidLink = (link: string) => (pattern.test(link));

  const fullFields = title.trim()
  && imgUrl.trim()
  && imdbUrl.trim()
  && imdbId.trim()
  && isValidLink(imgUrl)
  && isValidLink(imdbUrl);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');

    setHasError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        forChange={(value) => {
          setTitle(value);
          // setHasError(false);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        forChange={(value) => {
          setDescription(value);
          setHasError(true);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        forChange={(value) => {
          setImageUrl(value);
          setHasError(false);
        }}
        required
        isValidLink={isValidLink}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        forChange={(value) => {
          setImdbUrl(value);
          setHasError(false);
        }}
        required
        isValidLink={isValidLink}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        forChange={(value) => {
          setImdbId(value);
          setHasError(false);
        }}
        required
      />

      <div className={classNames('field', {
        'is-grouped': fullFields && !hasError,
      })}
      >
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!fullFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
