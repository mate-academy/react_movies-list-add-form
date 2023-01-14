import React, { useState, FormEvent } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (newMovie: Movie) => void,
}

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [isValidImbdUrl, setIsValidImbdUrl] = useState(true);

  const isUrlValid = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isUrlValid(imgUrl)) {
      setIsValidImgUrl(false);

      return;
    }

    if (!isUrlValid(imdbUrl)) {
      setIsValidImbdUrl(false);

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');

    onAdd(newMovie);
    setCount(prevCount => (prevCount + 1));
  };

  const shouldBeSubmitted = title.trim()
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim();

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
      key={count}
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
        value={imgUrl}
        onChange={setImgUrl}
        required
        isValid={isValidImgUrl}
        setIsValid={setIsValidImgUrl}

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        isValid={isValidImbdUrl}
        setIsValid={setIsValidImbdUrl}
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
            disabled={!shouldBeSubmitted}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
