import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrlHasMistake, setImdbUrlHasMistake] = useState(false);
  const [imgUrlHasMistake, setImgUrlHasMistake] = useState(false);

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setImgUrlHasMistake(false);
  };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setImdbUrlHasMistake(false);
  };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const checkUrl = () => {
    const pattern
    // eslint-disable-next-line max-len
    = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    setImgUrlHasMistake(!pattern.test(imgUrl));
    setImdbUrlHasMistake(!pattern.test(imdbUrl));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (imgUrlHasMistake || imdbUrlHasMistake) {
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
    setCount(currentCount => currentCount + 1);
  };

  const isDisabled = !title || !imgUrl || !imdbUrl
  || !imdbId || imgUrlHasMistake || imdbUrlHasMistake;

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
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        urlMistake={imgUrlHasMistake}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        urlMistake={imdbUrlHasMistake}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={checkUrl}
            disabled={!!isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
