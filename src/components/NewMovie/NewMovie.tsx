import { FC, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void
};

const initialFormState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState<Movie>(initialFormState);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const updateFormState = (key: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setFormState(initialFormState);
  };

  const isValidForm = title.trim() !== ''
    && imgUrl.trim() !== ''
    && imdbUrl.trim() !== ''
    && imdbId.trim() !== '';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onAdd(formState);

    setCount(prev => prev + 1);
    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={updateFormState}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={updateFormState}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={updateFormState}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={updateFormState}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={updateFormState}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
