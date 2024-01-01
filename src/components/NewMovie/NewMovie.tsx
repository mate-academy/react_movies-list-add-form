import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { imageValidate } from '../../utils/imageValidate';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [isImgError, setIsImgError] = useState(false);
  const [isImdbUrlError, setIsImdbUrlError] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setNewMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isImgError || isImdbUrlError) {
      return;
    }

    onAdd(newMovie);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  const onUrlCheck = () => {
    setIsImgError(imageValidate(imgUrl));
    setIsImdbUrlError(imageValidate(imdbUrl));
  };

  const isDisabled = !title || !imgUrl || !imdbId;

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
        onChange={handleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={handleInput}
        value={imgUrl}
        isUrlError={isImgError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={handleInput}
        value={imdbUrl}
        isUrlError={isImdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={handleInput}
        value={imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
            onClick={onUrlCheck}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
