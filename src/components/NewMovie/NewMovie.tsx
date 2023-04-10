import { useState } from 'react';

import { TextField } from '../TextField';

import { Movie } from '../../types/Movie';
import { pattern } from '../../regex/validation';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = (props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlIsValid, setImgUrlIsValid] = useState(false);
  const [imdbUrlIsValid, setImdbUrlIsValid] = useState(false);

  const isDisabled = !(
    title.trim() && imdbId.trim() && imdbUrl.trim()
    && imgUrl.trim() && !imdbUrlIsValid && !imgUrlIsValid
  );

  function resetForm() {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setCount(current => current + 1);

    props.onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    resetForm();
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
        value={title}
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
          setImgUrlIsValid(!pattern.test(value));
        }}
        isValid={imgUrlIsValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
          setImdbUrlIsValid(!pattern.test(value));
        }}
        isValid={imdbUrlIsValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
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
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
