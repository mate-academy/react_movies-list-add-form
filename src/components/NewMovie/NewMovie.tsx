import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [allValues, setAllValues] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setAllValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetFormValues = () => {
    setAllValues({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(allValues);

    setCount((prevCount) => prevCount + 1);
    resetFormValues();
  };

  const isAddButtonEnabled
  = allValues.title.trim()
    && allValues.imdbUrl.trim()
    && allValues.imgUrl.trim()
    && allValues.imdbId.trim();

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
        value={allValues.title}
        onChange={(value) => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={allValues.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={allValues.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={allValues.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={allValues.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddButtonEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
