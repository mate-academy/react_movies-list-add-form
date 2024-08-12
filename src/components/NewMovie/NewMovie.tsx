import React, { useState } from 'react';
import { TextField } from '../TextField';
import { NewMovieProps } from '../../types/Movie';

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormHasChar = () => {
    return title || imgUrl || imdbUrl || imdbId || description;
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const [hasErrors, setHasErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    const newErrors = {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    };

    if (!title) {
      newErrors.title = true;
      hasError = true;
    }

    if (!imgUrl) {
      newErrors.imgUrl = true;
      hasError = true;
    }

    if (!imdbUrl) {
      newErrors.imdbUrl = true;
      hasError = true;
    }

    if (!imdbId) {
      newErrors.imdbId = true;
      hasError = true;
    }

    if (hasError) {
      setHasErrors(newErrors);

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    reset();

    setCount(count + 1);

    setHasErrors({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
        externalError={hasErrors.title}
        resetErrorState={count > 0}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        resetErrorState={count > 0}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        externalError={hasErrors.imgUrl}
        resetErrorState={count > 0}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        externalError={hasErrors.imdbUrl}
        resetErrorState={count > 0}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        externalError={hasErrors.imdbId}
        resetErrorState={count > 0}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormHasChar()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
