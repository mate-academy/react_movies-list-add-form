import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descValue, setDescValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const submitDisabled = !titleValue || !imgUrlValue
    || !imdbUrlValue || !imdbIdValue;

  const clearForm = () => {
    setTitleValue('');
    setDescValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const addNewMovie = (e: React.FormEvent) => {
    const newMovie = {
      title: titleValue,
      description: descValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    e.preventDefault();
    onAdd(newMovie);
    setCount(count + 1);
    clearForm();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(value) => setTitleValue(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descValue}
        onChange={(value) => setDescValue(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(value) => setImgUrlValue(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={(value) => setImdbUrlValue(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(value) => setImdbIdValue(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
            onClick={addNewMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
