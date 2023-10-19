import React, { useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isReadyToSubmit = useMemo(() => {
    const hasContent = [title, imgUrl, imdbUrl, imdbId]
      .every(item => item !== '');
    const urlIsValid = [imdbUrl, imgUrl]
      .every(url => pattern.test(url));

    return hasContent && urlIsValid;
  }, [title, imgUrl, imdbUrl, imdbId]);

  const reset = () => {
    [setTitle, setDescription, setImgUrl, setImdbUrl, setImdbId]
      .forEach(func => func(''));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(prevState => prevState + 1);

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imdbId: imdbId.trim(),
      imdbUrl: imdbUrl.trim(),
      imgUrl: imgUrl.trim(),
    });

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={reset}
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
        label="Img URL"
        value={imgUrl}
        onChange={setImgUrl}
        validate={(value) => pattern.test(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validate={(value) => pattern.test(value)}
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
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
