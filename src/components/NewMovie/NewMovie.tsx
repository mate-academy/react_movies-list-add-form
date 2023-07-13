import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidLink } from './utils/validate';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [count, setCount] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const isDisabled = !titleValue || !imgUrlValue || !imdbUrlValue
    || !imdbIdValue || !isValidLink(imdbUrlValue) || !isValidLink(imgUrlValue);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
    setCount((x) => x + 1);

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    });
  }

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
        value={titleValue}
        onChange={(newValue) => setTitleValue(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(newValue) => setDescriptionValue(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        valid={isValidLink(imgUrlValue)}
        value={imgUrlValue}
        onChange={(newValue) => setImgUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        valid={isValidLink(imdbUrlValue)}
        value={imdbUrlValue}
        onChange={(newValue) => setImdbUrlValue(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(newValue) => setImdbIdValue(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
