import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movieToAdd: Movie) => void;
};

const defaultFormState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const checkFormFields = (formState: Movie): boolean => {
  return (
    !formState.title.trim()
    || !formState.imgUrl.trim()
    || !formState.imdbUrl.trim()
    || !formState.imdbId.trim()
  );
};

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(defaultFormState);

  const isSubmitButtonDisabled = checkFormFields(formState);

  const handleFormChange = (key: keyof Movie, newValue: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: newValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(formState);

    setCount((prev) => prev + 1);
    setFormState(defaultFormState);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handleFormChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleFormChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleFormChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleFormChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleFormChange('imdbId', value)}
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
