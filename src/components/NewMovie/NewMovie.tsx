/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [disabledBtn, setDisabledBtn] = useState(true);

  const validateUrl = (url: string) => {
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return !pattern.test(url);
  };

  const deleteInputValues = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  useEffect(() => {
    if (title && imgUrl && imdbUrl && imdbId) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [title, imgUrl, imdbUrl, imdbId]);

  const handleSubmit = () => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setDisabledBtn(true);
    deleteInputValues();
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
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        required
        validate={() => validateUrl(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
        required
        validate={() => validateUrl(imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledBtn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
