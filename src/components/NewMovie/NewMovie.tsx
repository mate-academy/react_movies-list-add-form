/* eslint-isInvalid @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { event } from 'cypress/types/jquery';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  function resetForm() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  const isInvalid = !title || !imgUrl || !imdbUrl || !imdbId;

  const handleSubmit = (value: React.FormEvent) => {
    value.preventDefault();

    if (isInvalid) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(counter => counter + 1);
    resetForm();
  };

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
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
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
            disabled={isInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
