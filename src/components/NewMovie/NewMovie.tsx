import { useCallback, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, changeCount] = useState(0);
  const [newMovieTitle, addNewMovieTitle] = useState('');
  const [newMovieDescription, addNewMovieDescription] = useState('');
  const [newMovieImgUrl, addNewMovieImgUrl] = useState('');
  const [newMovieImdbUrl, addNewMovieImdbUrl] = useState('');
  const [newMovieImdbId, addNewMovieImdbId] = useState('');

  function validateForm() {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return (!newMovieTitle
      || !newMovieImgUrl
      || (!newMovieImgUrl || !newMovieImgUrl.match(pattern))
      || (!newMovieImdbUrl || !newMovieImdbUrl.match(pattern))
      || !newMovieImdbId);
  }

  function clearForm() {
    addNewMovieTitle('');
    addNewMovieDescription('');
    addNewMovieImgUrl('');
    addNewMovieImdbUrl('');
    addNewMovieImdbId('');
  }

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      changeCount(count + 1);

      onAdd({
        title: newMovieTitle,
        description: newMovieDescription,
        imgUrl: newMovieImgUrl,
        imdbUrl: newMovieImdbUrl,
        imdbId: newMovieImdbId,
      });

      clearForm();
    }, [
      newMovieTitle,
      newMovieDescription,
      newMovieImgUrl,
      newMovieImdbUrl,
      newMovieImdbId,
    ],
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieTitle}
        onChange={(value) => {
          addNewMovieTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieDescription}
        onChange={(value) => {
          addNewMovieDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieImgUrl}
        onChange={(value) => {
          addNewMovieImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieImdbUrl}
        onChange={(value) => {
          addNewMovieImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieImdbId}
        onChange={(value) => {
          addNewMovieImdbId(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={validateForm()}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
