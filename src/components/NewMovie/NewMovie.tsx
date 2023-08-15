import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);

  const [submit, setSubmit] = useState(false);

  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState(false);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlErr, setImgUrlErr] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlErr, setImdbUrlErr] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdErr, setImdbIdErr] = useState(false);

  const reset = () => {
    setTitleErr(false);
    setImgUrlErr(false);
    setImdbUrlErr(false);
    setImdbIdErr(false);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setSubmit(false);
  };

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isLink = (text: string) => {
    return !text ? false : !!text.match(pattern);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      if (!title) {
        setTitleErr(true);
      }

      if (!imgUrl) {
        setImgUrlErr(true);
      } else if (isLink(imgUrl)) {
        setImgUrlErr(true);
      }

      if (!imdbUrl) {
        setImdbUrlErr(true);
      } else if (isLink(imdbUrl)) {
        setImdbUrlErr(true);
      }

      if (!imdbId) {
        setImdbIdErr(true);
      }

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
    setSubmit(true);
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
        value={title}
        label="Title"
        submit={submit}
        onChange={setTitle}
        setError={setTitleErr}
        required
      />

      <TextField
        name="description"
        value={description}
        label="Description"
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        value={imgUrl}
        label="Image URL"
        submit={submit}
        isUrl={isLink}
        onChange={setImgUrl}
        setError={setImgUrlErr}
        link
        required
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        submit={submit}
        isUrl={isLink}
        onChange={setImdbUrl}
        setError={setImdbUrlErr}
        link
        required
      />

      <TextField
        name="imdbId"
        value={imdbId}
        label="Imdb ID"
        onChange={setImdbId}
        setError={setImdbIdErr}
        submit={submit}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              titleErr
              || imgUrlErr
              || imdbUrlErr
              || imdbIdErr
              || !isLink(imgUrl)
              || !isLink(imdbUrl)
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
