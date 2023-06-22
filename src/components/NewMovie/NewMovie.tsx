import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [formState, setFormState] = useState<Movie>(initialMovie);

  const handleChange = (value: string, key: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setCount(prevCount => prevCount + 1);
    setFormState(initialMovie);
  };

  const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(formState);

    clearForm();
  };

  const isRequiredFieldsFilled = () => {
    const {
      title,
      imdbId,
      imdbUrl,
      imgUrl,
    } = formState;

    return title.trim()
  && imdbId.trim()
  && imdbUrl.trim()
  && imgUrl.trim();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={(value) => {
          handleChange(value, 'title');
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={(value) => {
          handleChange(value, 'description');
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={(value) => {
          handleChange(value, 'imgUrl');
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={(value) => {
          handleChange(value, 'imdbUrl');
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={(value) => {
          handleChange(value, 'imdbId');
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link not-active"
            disabled={!isRequiredFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
