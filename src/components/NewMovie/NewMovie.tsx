/* eslint-disable no-return-assign */
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
  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');

  const reset = () => {
    setDescriptionField('');
    setTitleField('');
    setImdbId('');
    setImgUrl('');
    setImdbUrl('');
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movieToSend = {
      title: titleField,
      description: descriptionField,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    onAdd(movieToSend);
    setCount((current) => {
      // eslint-disable-next-line no-param-reassign
      return (current += 1);
    });
    reset();
  };

  const disabled = !titleField || !imgUrl || !imdbId || !imdbUrl;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={formSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleField}
        onChange={(value) => setTitleField(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionField}
        onChange={(value) => setDescriptionField(value)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => setImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => setImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => setImdbId(value)}
        required
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
