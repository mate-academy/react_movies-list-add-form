import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

const initialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [count, setCount] = useState(0);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const validationOfFormState = title.trim()
  && imdbId.trim()
  && imdbUrl.trim()
  && imgUrl.trim();

  const handleFormState = (key: string, value: string) => {
    setFormState((previusFormState) => ({
      ...previusFormState,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setFormState(initialFormState);
    setCount(prevCount => prevCount + 1);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(formState);

    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitHandler}
    >

      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handleFormState('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleFormState('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleFormState('imgUrl', value)}
        required

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleFormState('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleFormState('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validationOfFormState}
          >
            Add
          </button>
        </div>
      </div>

    </form>
  );
};
