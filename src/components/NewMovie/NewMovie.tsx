import React from 'react';
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [description, setDescription] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const handTitle = (value: string) => {
    setTitle(value);
    setHasTitleError(false);
  };

  const handhasImgUr = (value: string) => {
    setImgUrl(value);
    setHasImgUrlError(false);
  };

  const handImdbUrl = (value: string) => {
    setImdbUrl(value);
    setHasImdbUrlError(false);
  };

  const handImdbId = (value: string) => {
    setImdbId(value);
    setHasImdbIdError(false);
  };

  const pattern = new RegExp(
    '^' +
      '((([A-Za-z]{3,9}:(?:\\/\\/)?)' +
      '(?:[-;:&=+$,\\w]+@)?' +
      '[A-Za-z0-9.-]+' +
      '|(?:www\\.|[-;:&=+$,\\w]+@)' +
      '[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?' +
      '\\??' +
      '(?:[-+=&;%@,.\\w_]*)' +
      '#?' +
      '(?:[,.!/\\\\\\w]*))?)' +
      '$',
  );

  const trueTest = () => {
    if (
      !title.trim() ||
      !pattern.test(imgUrl) ||
      !pattern.test(imdbUrl) ||
      !imdbId.trim()
    ) {
      return true;
    }

    return false;
  };

  const handSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasImgUrlError(!pattern.test(imgUrl));
    setHasImdbUrlError(!pattern.test(imdbUrl));
    setHasImdbIdError(!imdbId.trim());

    if (trueTest()) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setFormKey(prevKey => prevKey + 1);

    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" onSubmit={handSubmit} key={formKey}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handTitle}
        required={!hasTitleError}
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
        onChange={handhasImgUr}
        required={!hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handImdbUrl}
        required={!hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handImdbId}
        required={!hasImdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={trueTest()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
