import { useState } from 'react';
import { TextField } from '../TextField';

interface Movie{
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type Add = (value: Movie) => void;

export const NewMovie = ({ onAdd }: { onAdd: Add }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const movie: Movie = {
    title: titleValue,
    description: descriptionValue,
    imgUrl: imgUrlValue,
    imdbUrl: imdbUrlValue,
    imdbId: imdbIdValue,
  };

  const reset = () => {
    setCount(count + 1);
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const disabledCondition
  = titleValue === ''
    || imgUrlValue === ''
    || imdbIdValue === ''
    || imdbUrlValue === '';

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        onAdd(movie);
        reset();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(value) => {
          setTitleValue(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(value) => {
          setDescriptionValue(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(value) => {
          setImgUrlValue(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={(value) => {
          setImdbUrlValue(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(value) => {
          setImdbIdValue(value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledCondition}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
