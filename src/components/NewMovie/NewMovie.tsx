import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // const [count, setCount] = useState(0);
  const defaultValues: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbId: '',
    imdbUrl: '',
  };
  const [values, setValues] = useState<Movie>(defaultValues);
  const [count, setCount] = useState<number>(0);

  const handleChangeValues = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Movie,
  ) => {
    const { value } = event.target;

    setValues(item => ({
      ...item,
      [fieldName]: value,
    }));
  };

  const { title, description, imgUrl, imdbUrl, imdbId } = values;

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbId.trim() && imdbUrl.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(values);

    setValues(defaultValues);
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => handleChangeValues(e, 'title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => handleChangeValues(e, 'description')}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => handleChangeValues(e, 'imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => handleChangeValues(e, 'imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => handleChangeValues(e, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
