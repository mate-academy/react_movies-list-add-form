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
  const [isValidImgUrl, setIsValidImgUrl] = useState(false);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(false);

  const urlCheck = (url: string) => {
    // eslint-disable-next-line max-len
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return !regex.test(url);
  };

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const isValid = !(
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim()
    && !isValidImdbUrl
    && !isValidImgUrl
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        onAdd(newMovie);
        setCount(count + 1);
        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newTitle) => setTitle(newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newDescription) => setDescription(newDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        isValidUrl={isValidImgUrl}
        onChange={(newImgUrl) => {
          setImgUrl(newImgUrl);
          setIsValidImgUrl(urlCheck(newImgUrl));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        isValidUrl={isValidImdbUrl}
        onChange={(newImdbUrl) => {
          setImdbUrl(newImdbUrl);
          setIsValidImdbUrl(urlCheck(newImdbUrl));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newImdbId) => setImdbId(newImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
