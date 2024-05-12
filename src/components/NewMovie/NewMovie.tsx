import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleField, setTitleField] = useState<string>('');
  const [descriptionField, setDescriptionField] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImbdUrl] = useState<string>('');
  const [imdbId, setImbdId] = useState<string>('');
  const [isTouched, setIsTouched] = useState(false);

  const newMovie: Movie = {
    title: titleField,
    description: descriptionField,
    imgUrl: imgUrl,
    imdbUrl: imdbUrl,
    imdbId: imdbId,
  };

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const [isValidUrl, setIsValidUrl] = useState(true);

  const checkForValidUrl = (url: string) => {
    setIsValidUrl(pattern.test(url));

    return pattern.test(url);
  };

  const isDisabled = () => {
    if (!titleField || !imgUrl || !imdbUrl || !imdbId) {
      return true;
    }

    if (!isValidUrl) {
      return true;
    }

    return false;
  };

  const reset = () => {
    setTitleField('');
    setDescriptionField('');
    setImgUrl('');
    setImbdUrl('');
    setImbdId('');
    setIsTouched(false);
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd(newMovie);
    setCount(count + 1);
    reset();
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        handleSubmit(event);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        isTouched={isTouched}
        name="title"
        label="Title"
        value={titleField}
        onChange={setTitleField}
        required
      />

      <TextField
        isTouched={isTouched}
        name="description"
        label="Description"
        value={descriptionField}
        onChange={setDescriptionField}
      />

      <TextField
        isTouched={isTouched}
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        checkUrl={checkForValidUrl}
        required
      />

      <TextField
        isTouched={isTouched}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImbdUrl}
        checkUrl={checkForValidUrl}
        required
      />

      <TextField
        isTouched={isTouched}
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
