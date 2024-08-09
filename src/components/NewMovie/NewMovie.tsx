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

  const isValid =
    newData.title.trim() &&
    newData.imgUrl.trim() &&
    newData.imdbUrl.trim() &&
    newData.imdbId.trim();

  const reset = () => {
    setNewData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();

    setCount(prev => prev + 1);

    onAdd(newData);

    reset();
  };

  const handleNewData = (name: string, value: string) => {
    setNewData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newData.title}
        onChange={newValue => {
          handleNewData('title', newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newData.description}
        onChange={newValue => {
          handleNewData('description', newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newData.imgUrl}
        onChange={newValue => {
          handleNewData('imgUrl', newValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newData.imdbUrl}
        onChange={newValue => {
          handleNewData('imdbUrl', newValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newData.imdbId}
        onChange={newValue => {
          handleNewData('imdbId', newValue);
        }}
        required
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
