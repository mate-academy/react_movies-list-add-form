import { FormEvent, FunctionComponent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FunctionComponent<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newTitle, setTitle] = useState('');
  const [newDescription, setDescription] = useState('');
  const [newImgUrl, setImgUrl] = useState('');
  const [newImdbUrl, setImdbUrl] = useState('');
  const [newImdbId, setImdbId] = useState('');
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?[.!\\/\w]*)?)$/;

  const isNotValid = !newTitle
  || !newImgUrl
  || !newImdbUrl.match(pattern)
  || !newImdbId;

  const onSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    setCount(count + 1);

    onAdd({
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newTitle}
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newDescription}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newImgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newImdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newImdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
