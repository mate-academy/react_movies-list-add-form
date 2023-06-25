import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movieToAdd: Movie) => void;
};

export const NewMovie: FC<Props> = (props: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const defaultFormState: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [formState, setFormState] = useState(defaultFormState);

  const { onAdd } = props;

  const isSubmitButtonDisabled = (
    !formState.title.trim()
    || !formState.imgUrl.trim()
    || !formState.imdbUrl.trim()
    || !formState.imdbId.trim()
  );

  const handleFormChange = (key: string, newValue: string) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(formState);

    setCount(prev => prev + 1);
    setFormState(defaultFormState);
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
        value={formState.title}
        onChange={value => handleFormChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={value => handleFormChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={value => handleFormChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={value => handleFormChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={value => handleFormChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
