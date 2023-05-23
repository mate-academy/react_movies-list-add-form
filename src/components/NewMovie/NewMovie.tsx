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
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlIsValid, setImgUrlIsValid] = useState(true);
  const [imdbUrlIsValid, setImdbUrlIsValid] = useState(true);

  const urlIsNotValid = !imgUrlIsValid || !imdbUrlIsValid;

  const submitIsDisabled
    = !title.trim() || !imageUrl || !imdbUrl || !imdbId || urlIsNotValid;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const validateUrl = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl: imageUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    resetForm();

    setCount(count + 1);
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
        value={imageUrl}
        onChange={setImageUrl}
        onSetUrlIsValid={(url) => setImgUrlIsValid(validateUrl(url))}
        urlIsValid={imgUrlIsValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onSetUrlIsValid={(url) => setImdbUrlIsValid(validateUrl(url))}
        urlIsValid={imdbUrlIsValid}
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
            disabled={submitIsDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
