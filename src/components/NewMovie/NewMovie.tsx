import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAddNewMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAddNewMovie }) => {
  const [countAddNewMovie, setCountAddNewMovie] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFieldsEmpty = !title || !imgUrl || !imdbUrl || !imdbId;

  const createNewMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const clearMovieFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();

    onAddNewMovie(createNewMovie);
    clearMovieFields();
    setCountAddNewMovie(countAddNewMovie + 1);
  };

  return (
    <form
      className="NewMovie"
      key={countAddNewMovie}
      onSubmit={handleAddMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChangeField={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChangeField={setDescription}

      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChangeField={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChangeField={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChangeField={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFieldsEmpty}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
