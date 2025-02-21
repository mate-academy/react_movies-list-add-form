import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';
import { urlPattern } from '../../Utils/regex';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setImdbUrllError] = useState('');

  const isValidUrl = (url: string) => {
    return url.match(urlPattern) !== null;
  };

  const isRequiredFieldsFilled = (): boolean => {
    const hasAllFieldsFilled =
      !!title.trim() && !!imgUrl.trim() && !!imdbUrl.trim() && !!imdbId.trim();
    const hasNoInvalidUrls = !imgUrlError && !imdbUrlError;
    const isDataValid = hasAllFieldsFilled && hasNoInvalidUrls;

    return isDataValid;
  };

  const handleImgUrlChange = (value: string) => {
    setImgUrl(value);

    const errorMessage = isValidUrl(value)
      ? ''
      : 'The URL you entered is invalid.';

    setImgUrlError(errorMessage);
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);

    const errorMessage = isValidUrl(value)
      ? ''
      : 'The URL you entered is invalid.';

    setImdbUrllError(errorMessage);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setImgUrlError('');
    setImdbUrllError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isRequiredFieldsFilled()) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        placeholder="Enter Title"
        value={title}
        onChange={value => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        placeholder="Enter Description"
        value={description}
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        placeholder="Enter Image URL"
        value={imgUrl}
        onChange={value => handleImgUrlChange(value)}
        required
        errorMesage={imgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        placeholder="Enter Imdb URL"
        value={imdbUrl}
        onChange={value => handleImdbUrlChange(value)}
        required
        errorMesage={imdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        placeholder="Enter Imdb ID"
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
            disabled={!isRequiredFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
