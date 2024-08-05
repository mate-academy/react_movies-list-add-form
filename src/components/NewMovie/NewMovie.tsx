import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newData, setNewData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleNewData = (name: string, value: string) => {
    setNewData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValid =
    newData.title.trim() &&
    newData.imdbUrl.trim() &&
    newData.imgUrl.trim() &&
    newData.imdbId.trim();

  const reset = () =>
    setNewData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(prev => prev + 1);

    onAdd(newData);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleOnSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newData.title}
        onChange={newValue => handleNewData('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newData.description}
        onChange={newValue => handleNewData('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newData.imgUrl}
        required
        onChange={newValue => handleNewData('imgUrl', newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newData.imdbUrl}
        required
        onChange={newValue => handleNewData('imdbUrl', newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newData.imdbId}
        required
        onChange={newValue => handleNewData('imdbId', newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
