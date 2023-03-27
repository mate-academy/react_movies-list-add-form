import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [valueTitle, setValue] = useState('');
  const [valueDescription, setValueDescription] = useState('');
  const [valueImageUrl, setValueImageUrl] = useState('');
  const [valueImdbUrl, setValueImdbUrl] = useState('');
  const [valueImdbId, setValueImdbId] = useState('');

  const checkButton
    = valueTitle !== ''
    && valueImageUrl !== ''
    && valueImdbUrl !== ''
    && valueImdbId !== '';

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        onAdd({
          title: valueTitle,
          description: valueDescription,
          imgUrl: valueImageUrl,
          imdbUrl: valueImdbUrl,
          imdbId: valueImdbId,
        });

        setValue('');
        setValueDescription('');
        setValueImageUrl('');
        setValueImdbUrl('');
        setValueImdbId('');

        setCount(current => current + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={valueTitle}
        onChange={setValue}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={valueDescription}
        onChange={setValueDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={valueImageUrl}
        onChange={setValueImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={valueImdbUrl}
        onChange={setValueImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={valueImdbId}
        onChange={setValueImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!checkButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
