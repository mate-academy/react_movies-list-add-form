import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const initialMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [newMovieForm, setNewMovieForm] = useState<Movie>(initialMovie);

  const handleChange = (value: string, key: string) => {
    setNewMovieForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const clearForm = () => {
    setCount(prevCount => prevCount + 1);
    setNewMovieForm(initialMovie);
  };

  const handleFormSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovieForm);

    clearForm();
  };

  const isRequiredFieldsFilled = newMovieForm.title
  && newMovieForm.imdbId
  && newMovieForm.imdbUrl
  && newMovieForm.imgUrl;

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
        value={newMovieForm.title}
        onChange={(value) => {
          handleChange(value, 'title');
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieForm.description}
        onChange={(value) => {
          handleChange(value, 'description');
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieForm.imgUrl}
        onChange={(value) => {
          handleChange(value, 'imgUrl');
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieForm.imdbUrl}
        onChange={(value) => {
          handleChange(value, 'imdbUrl');
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieForm.imdbId}
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
            disabled={!isRequiredFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
