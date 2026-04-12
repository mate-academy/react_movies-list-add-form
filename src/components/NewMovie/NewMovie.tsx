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

  const fieldsRequired = [title, imgUrl, imdbUrl, imdbId];
  const isDisableButton = fieldsRequired.some(field => field.trim() === '');

  const reset = () => {
    const allSetFields = [
      setTitle,
      setDescription,
      setImgUrl,
      setImdbUrl,
      setImdbId,
    ];

    allSetFields.forEach(setField => setField(''));
  };

  const onSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);
    reset();
    setCount(prev => prev + 1);
  };

  const validateUrl = (str: string) => {
    /* eslint-disable max-len */
    const pattern =
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
    /* eslint-enable max-len */

    return pattern.test(str.trim()) ? null : 'Invalid URL format';
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSumbit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={str => {
          setTitle(str);
        }}
        required={true}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={str => {
          setDescription(str);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={str => {
          setImgUrl(str);
        }}
        required={true}
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={str => {
          setImdbUrl(str);
        }}
        required={true}
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={str => {
          setImdbId(str);
        }}
        required={true}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisableButton}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
