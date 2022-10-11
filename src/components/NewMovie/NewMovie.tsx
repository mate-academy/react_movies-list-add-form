import React, { useState, FormEvent } from 'react';
import classNames from 'classnames';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imageValue, setImageValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const [count, setCount] = useState(0);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const fillInput
    = titleValue
    && imageValue
    && imdbUrlValue
    && imdbIdValue;

  const correctImgUrl = pattern.test(imageValue);
  const correctImdbUrl = pattern.test(imdbUrlValue);

  const correctUrl
    = correctImgUrl
    && correctImdbUrl;

  const notEmpty = /\S+/.test(titleValue) && /\S+/.test(imdbIdValue);

  const resetField = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImageValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const onAddMovie = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (fillInput && correctUrl && notEmpty) {
      resetField();

      onAdd({
        title: titleValue,
        description: descriptionValue,
        imgUrl: imageValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      });

      setCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onAddMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageValue}
        onChange={setImageValue}
        correctUrl={correctImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={setImdbUrlValue}
        correctUrl={correctImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={setImdbIdValue}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className={classNames(
              'button is-link',
              {
                'button is-link is-light':
                  !fillInput
                  || !correctUrl
                  || !notEmpty,
              },
            )}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
