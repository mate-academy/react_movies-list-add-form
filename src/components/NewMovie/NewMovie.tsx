import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const FORM_INITIAL_VALUES = {
  TITLE: '',
  DESCRIPTION: '',
  IMGURL: '',
  IMDBURL: '',
  IMDBID: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState(FORM_INITIAL_VALUES.TITLE);
  const [description, setDescription] = useState(
    FORM_INITIAL_VALUES.DESCRIPTION,
  );
  const [imgUrl, setImgUrl] = useState(FORM_INITIAL_VALUES.IMDBURL);
  const [imdbUrl, setImdbUrl] = useState(FORM_INITIAL_VALUES.IMDBURL);
  const [imdbId, setImdbId] = useState(FORM_INITIAL_VALUES.IMDBID);

  function validateInputValues() {
    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      return true;
    }

    return false;
  }

  function reset() {
    setTitle(FORM_INITIAL_VALUES.TITLE);
    setDescription(FORM_INITIAL_VALUES.DESCRIPTION);
    setImgUrl(FORM_INITIAL_VALUES.IMGURL);
    setImdbUrl(FORM_INITIAL_VALUES.IMDBURL);
    setImdbId(FORM_INITIAL_VALUES.IMDBID);
    setCount(currentCount => currentCount + 1);
  }

  const handleNewMovie = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
    reset();
  };

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
      '[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)$',
  );

  return (
    <form className="NewMovie" key={count}>
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
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        customValidate={receivedValue => {
          return pattern.test(receivedValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        customValidate={receivedValue => {
          return pattern.test(receivedValue);
        }}
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
            disabled={validateInputValues()}
            onClick={handleNewMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
