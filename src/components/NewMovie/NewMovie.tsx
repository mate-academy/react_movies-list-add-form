import { useCallback, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const defaultFormValue = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [formValue, setFormValue] = useState<Movie>(defaultFormValue);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormValue(defaultFormValue);
    setCount(count + 1);
    onAdd(formValue);
  };

  useMemo(() => {
    const { title, imgUrl, imdbUrl, imdbId } = formValue;

    setIsValid(
      !!(title?.trim() && imgUrl?.trim() && imdbUrl?.trim() && imdbId?.trim()),
    );
  }, [formValue]);

  const updateFormValue = useCallback((key: string, value: string) => {
    setFormValue(previousValue => ({ ...previousValue, [key]: value }));
  }, []);

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValue.title}
        onChange={newValue => {
          updateFormValue('title', newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValue.description}
        onChange={newValue => {
          updateFormValue('description', newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValue.imgUrl}
        required
        onChange={newValue => {
          updateFormValue('imgUrl', newValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValue.imdbUrl}
        required
        onChange={newValue => {
          updateFormValue('imdbUrl', newValue);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValue.imdbId}
        required
        onChange={newValue => {
          updateFormValue('imdbId', newValue);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
