import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  // #region TextField's
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // #endregion

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const validateForm = () => {
    const EmptyField =
      title.trim() === '' ||
      imgUrl.trim() === '' ||
      imdbUrl.trim() === '' ||
      imdbId.trim() === '';

    const isLink =
      pattern.test(imgUrl.trim()) === true &&
      pattern.test(imdbUrl.trim()) === true;

    if (EmptyField || !isLink) {
      return false;
    }

    return true;
  };

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    resetForm();
  };

  const getTextFields = () => {
    if (!validateForm()) {
      return true;
    }

    if (title && imgUrl && imdbUrl && imdbId) {
      return false;
    }

    return true;
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handlerOnSubmit}>
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
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setimgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={getTextFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
