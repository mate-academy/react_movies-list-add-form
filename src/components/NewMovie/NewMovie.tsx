import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const INITIAL_FORM = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [initialForm, setInitialForm] = useState(INITIAL_FORM);
  const [count, setCount] = useState(0);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialForm((prevForm) => ({
      ...prevForm,
      [event.target.name]: event.target.value,
    }));
  };

  const isAddButtonDisabled = !initialForm.title
    || !initialForm.imgUrl
    || !initialForm.imdbUrl
    || !initialForm.imdbId;

  const reset = () => {
    setInitialForm(INITIAL_FORM);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title: initialForm.title,
      description: initialForm.description,
      imgUrl: initialForm.imgUrl,
      imdbUrl: initialForm.imdbUrl,
      imdbId: initialForm.imdbId,
    });

    reset();
    setCount(count + 1);
  };

  return (
    <form
      action="/api"
      method="POST"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={initialForm.title}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={initialForm.description}
        onChange={handleFormChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={initialForm.imgUrl}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={initialForm.imdbUrl}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={initialForm.imdbId}
        onChange={handleFormChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
