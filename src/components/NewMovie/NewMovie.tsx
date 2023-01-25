import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

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
  const [isValidImgUrl, setIsValidImgUrl] = useState(true);
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(true);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setIsValidImgUrl(true);
    setIsValidImdbUrl(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
      setIsValidImgUrl(false);
      setIsValidImdbUrl(false);

      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);
    clearForm();
    setCount(prev => prev + 1);
  };

  const isActiveButton = title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim();

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
        onChange={(newValue: string) => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => setImgUrl(newValue)}
        isValidUrl={isValidImgUrl}
        setIsValidUrl={(newValue: boolean) => setIsValidImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => setImdbUrl(newValue)}
        isValidUrl={isValidImdbUrl}
        setIsValidUrl={(newValue: boolean) => setIsValidImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isActiveButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
