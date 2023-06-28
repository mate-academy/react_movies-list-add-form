import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const ititialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(ititialFormState);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = formState;

  const handleChange = (name: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormState(ititialFormState);
  };

  const isAllFieldsFilled = title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    resetForm();

    onAdd(formState);
    setCount(prevCount => prevCount + 1);
    resetForm();
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
        value={title}
        onChange={(value) => {
          handleChange('title', value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          handleChange('description', value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          handleChange('imgUrl', value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          handleChange('imdbUrl', value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          handleChange('imdbId', value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
