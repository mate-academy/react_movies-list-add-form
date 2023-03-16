import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie:Movie) => void,
};

/* eslint max-len: ["error", { "code": 200 }] */
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie:React.FC<Props> = (props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, changeCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlIsValid, tougleValidImgUrl] = useState(true);
  const [imdbUrlIsValid, tougleValidImdbUrl] = useState(true);

  const { onAdd } = props;

  const formFilledEnough = Boolean(title.length
    && imgUrl.length
    && imdbUrl.length
    && imdbId.length
    && imgUrlIsValid
    && imdbUrlIsValid);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        const newMovie = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        onAdd(newMovie);

        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');
        changeCount((prev) => prev + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        isValid
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        isValid
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          tougleValidImgUrl(false);

          if (event.search(pattern) !== -1) {
            tougleValidImgUrl(true);
          }

          setImgUrl(event);
        }}
        required
        isValid={imgUrlIsValid}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          tougleValidImdbUrl(false);

          if (event.search(pattern) !== -1) {
            tougleValidImdbUrl(true);
          }

          setImdbUrl(event);
        }}
        required
        isValid={imdbUrlIsValid}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
        isValid
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formFilledEnough}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
