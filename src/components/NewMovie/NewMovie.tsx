import React, { FormEvent, useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  addMovie: CallableFunction;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const setSubmitStatus = () => {
    if (title && imgUrl && imdbUrl && imdbId && isSubmitDisabled) {
      setIsSubmitDisabled(false);
    }

    if (!isSubmitDisabled && (!title || !imgUrl || !imdbUrl || !imdbId)) {
      setIsSubmitDisabled(true);
    }
  };

  setSubmitStatus();

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (event: FormEvent) => {
    addMovie(newMovie);
    setCount((prevCount) => (prevCount + 1));
    clearFields();
    event.preventDefault();
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
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
