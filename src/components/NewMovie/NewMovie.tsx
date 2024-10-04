import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onSubmit: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formValues, setFormValues] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { description, ...valuesWithoutDescription } = formValues;
  const formHasEmptyFields = Object.values(valuesWithoutDescription).some(
    value => value === '',
  );

  function prepareFormValues(value: string, name: string) {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function clearFields() {
    setFormValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (formHasEmptyFields) {
      return;
    }

    onSubmit(formValues);
    setCount(prev => prev + 1);
    clearFields();
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formValues.title}
        prepareFormValues={prepareFormValues}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formValues.description}
        prepareFormValues={prepareFormValues}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formValues.imgUrl}
        prepareFormValues={prepareFormValues}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formValues.imdbUrl}
        prepareFormValues={prepareFormValues}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formValues.imdbId}
        prepareFormValues={prepareFormValues}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={formHasEmptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
