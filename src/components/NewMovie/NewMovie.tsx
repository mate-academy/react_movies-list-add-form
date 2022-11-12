import React, { useState } from 'react';
import { TextField } from '../TextField';
import { InputEvent, Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
// eslint-disable-next-line
export const urlValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = (({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [count, setCount] = useState(0);
  const [isTitleBlur, setIsTitleBlur] = useState(true);
  const [isImgUrlBlur, setIsImgUrlBlur] = useState(true);
  const [isImdbIdBlur, setIsImdbIdBlur] = useState(true);
  const [isImdbUrlBlur, setIsImdbUrlBlur] = useState(true);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImgUrl('');
    setImdbUrl('');
    setCount(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imdbId,
      imgUrl,
      imdbUrl,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      setCount(count + 1);
      reset();
    }

    if (isTitleBlur) {
      setIsTitleBlur(true);
    }

    if (isImdbIdBlur) {
      setIsImdbIdBlur(true);
    }

    if (isImgUrlBlur) {
      setIsImgUrlBlur(true);
    }

    if (isImdbUrlBlur) {
      setIsImdbUrlBlur(true);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!title) {
          setIsTitleBlur(false);
        }

        break;

      case 'imgUrl':
        if (!imgUrl || !urlValidation.test(value)) {
          setIsImgUrlBlur(false);
        }

        break;

      case 'imdbUrl':
        if (!imdbUrl || !urlValidation.test(value)) {
          setIsImdbUrlBlur(false);
        }

        break;

      case 'imdbId':
        if (!imdbId) {
          setIsImdbIdBlur(false);
        }

        break;

      default:
        break;
    }
  };

  const disableButton = (
    !title
    || !imgUrl
    || !imdbId
    || !imdbUrl
  );

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
        onChange={(event: InputEvent) => {
          setTitle(event.target.value);
        }}
        required
        onBlur={handleBlur}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event: InputEvent) => {
          setDescription(event.target.value);
        }}
        onBlur={handleBlur}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event: InputEvent) => {
          setImgUrl(event.target.value);
        }}
        required
        onBlur={handleBlur}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event: InputEvent) => {
          setImdbUrl(event.target.value);
        }}
        required
        onBlur={handleBlur}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event: InputEvent) => {
          setImdbId(event.target.value);
        }}
        required
        onBlur={handleBlur}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
