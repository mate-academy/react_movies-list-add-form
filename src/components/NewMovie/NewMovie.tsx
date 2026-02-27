import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const pattern =
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.)))/;

  const [disabled, setDisabled] = useState(true);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const disabledCheck = () => {
    if (title && pattern.test(imgUrl) && pattern.test(imdbUrl) && imdbId) {
      setDisabled(false);
    }
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (title && pattern.test(imgUrl) && pattern.test(imdbUrl) && imdbId) {
      setDisabled(false);

      const movie = {
        title: title.trim(),
        description: description.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
      };

      onAdd(movie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setDisabled(true);
      setCount(c => c + 1);

      return;
    } else {
      setDisabled(true);

      return;
    }
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => {
          setTitle(e);
          disabledCheck();
        }}
        required
        // error={hasTitleError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => {
          setDescription(e);
          disabledCheck();
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => {
          setImgUrl(e);
          disabledCheck();
        }}
        required
        // error={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => {
          setImdbUrl(e);
          disabledCheck();
        }}
        required
        // error={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => {
          setImdbId(e);
          disabledCheck();
        }}
        required
        // error={hasImdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
