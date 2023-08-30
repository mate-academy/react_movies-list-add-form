import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  addMovie: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ addMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [inputTitle, setTitle] = useState('');
  const [inputDescription, setDescription] = useState('');
  const [inputImageUrl, setImageUrl] = useState('');
  const [inputImdbUrl, setImdbUrl] = useState('');
  const [inputImdbId, setImdbId] = useState('');

  const isFormValid
  = inputTitle !== ''
  && inputImageUrl !== ''
  && inputImdbUrl !== ''
  && inputImdbId !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovieFromForm = {
      title: inputTitle,
      description: inputDescription,
      imgUrl: inputImageUrl,
      imdbUrl: inputImdbUrl,
      imdbId: inputImdbId,
    };

    addMovie(newMovieFromForm);

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
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
        value={inputTitle}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={inputDescription}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputImageUrl}
        onChange={setImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputImdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputImdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
            // update moviesFromServer and re-render MoviesList
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
