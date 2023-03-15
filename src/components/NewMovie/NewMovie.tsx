import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isValid, setIsValid] = useState(false);

  const handleChange = (newValue: string,
    stateSetterFunc: React.Dispatch<React.SetStateAction<string>>) => {
    stateSetterFunc(newValue);

    if (title.trim().length > 0 && imgUrl.trim().length > 0
      && imdbUrl.trim().length > 0 && imdbId.trim().length > 0) {
      setIsValid(true);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const addMovie = (event: React.MouseEvent) => {
    event.preventDefault();

    onAdd({
      title, description, imdbUrl, imgUrl, imdbId,
    });
    setCount((prev) => {
      return prev + 1;
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => handleChange(newValue, setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => handleChange(newValue, setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => handleChange(newValue, setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => handleChange(newValue, setImdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => handleChange(newValue, setImdbId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
            onClick={addMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
