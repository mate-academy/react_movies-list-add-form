import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

const initialForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [details, setDetails] = useState(initialForm);

  const filled = details.title
    && details.imdbId
    && details.imdbUrl
    && details.imgUrl;

  const handleTextFieldChanges = (name: string, value: string) => {
    setDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(details);
    setCount(count + 1);
    setDetails(initialForm);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={details.title}
        onChange={handleTextFieldChanges}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={details.description}
        onChange={handleTextFieldChanges}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={details.imgUrl}
        onChange={handleTextFieldChanges}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={details.imdbUrl}
        onChange={handleTextFieldChanges}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={details.imdbId}
        onChange={handleTextFieldChanges}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!filled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
