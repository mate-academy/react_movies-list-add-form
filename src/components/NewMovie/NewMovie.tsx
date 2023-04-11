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
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const isDisabled = !(
    title.trim() && imdbId.trim() && imdbUrl.trim()
    && imgUrl.trim() && !isImdbUrlValid && !isImgUrlValid
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
        onChange={(value) => {
          setImgUrl(value);
          setIsImgUrlValid(!pattern.test(value));
        }}
        isValid={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
          setIsImdbUrlValid(!pattern.test(value));
        }}
        isValid={isImdbUrlValid}
        required
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
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
