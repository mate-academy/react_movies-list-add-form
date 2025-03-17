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

  const [titleValue, setTitleValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(currentCount => currentCount + 1);

    onAdd({
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrl,
      imdbId: imdbIdValue,
    });

    setTitleValue('');
    setImgUrlValue('');
    setImdbUrl('');
    setImdbIdValue('');
    setDescriptionValue('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={newValue => setTitleValue(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={newValue => setDescriptionValue(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        required
        onChange={newValue => setImgUrlValue(newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={newValue => setImdbUrl(newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        required
        onChange={newValue => setImdbIdValue(newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !titleValue.trim() ||
              !imgUrlValue.trim() ||
              !imdbUrl.trim() ||
              !imdbIdValue.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
