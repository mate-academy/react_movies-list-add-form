import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

enum FieldType {
  TITLE = 'title',
  DESCRIPTION = 'descripton',
  IMG_URL = 'imgUrl',
  IMDB_URL = 'imdbUrl',
  IMDB_ID = 'imdbId',
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState<boolean>(true);

  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState<boolean>(true);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState<boolean>(true);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState<boolean>(true);

  const hasFormerrors = (
    hasTitleError || hasImgUrlError || hasImdbUrlError || hasImdbIdError
  );

  function clear() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  function handleChange(text: string, field: FieldType) {
    switch (field) {
      case FieldType.TITLE:
        setTitle(text);
        setHasTitleError(false);
        break;

      case FieldType.DESCRIPTION:
        setDescription(text);
        break;

      case FieldType.IMG_URL:
        setImgUrl(text);
        setHasImgUrlError(false);
        break;

      case FieldType.IMDB_URL:
        setImdbUrl(text);
        setHasImdbUrlError(false);
        break;

      case FieldType.IMDB_ID:
        setImdbId(text);
        setHasImdbIdError(false);
        break;

      default:
        break;
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (!imgUrl) {
      setHasImgUrlError(true);
    }

    if (!imdbUrl) {
      setHasImdbUrlError(true);
    }

    if (!imdbId) {
      setHasImdbIdError(true);
    }

    if (!hasFormerrors) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      setCount(count + 1);
      clear();
    }
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => handleChange(event, FieldType.TITLE)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => handleChange(event, FieldType.DESCRIPTION)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => handleChange(event, FieldType.IMG_URL)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => handleChange(event, FieldType.IMDB_URL)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => handleChange(event, FieldType.IMDB_ID)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={hasFormerrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
