import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
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

  const trimmedValues = {
    title: title.trim(),
    imgUrl: imgUrl.trim(),
    imdbUrl: imdbUrl.trim(),
    imdbId: imdbId.trim(),
  };

  const isSubmitDisabled = Object.values(trimmedValues).some(v => !v);

  const isEmpty = Object.values(trimmedValues).some(tv => tv.length === 0);

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isValid = (url: string) => {
    if (url) {
      if (!pattern.test(url)) {
        return 'Your URL is not valid';
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const imgUrlError = isValid(imgUrl.trim());
  const imdbError = isValid(imdbUrl.trim());

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isEmpty) {
      return;
    }

    onAdd({
      title: title.trim(),
      description,
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(c => c + 1);
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
        onChange={setImgUrl}
        validation={isValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validation={isValid}
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
            disabled={isSubmitDisabled || !!imgUrlError || !!imdbError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
