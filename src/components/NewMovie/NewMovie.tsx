import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [count, setCount] = useState(0);

  const [movieDef, setMovieDef] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const readyToSubmit = Object.values(movieDef).every((item) => item !== '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCount(prevState => prevState + 1);

    onAdd({
      title: movieDef.title.trim(),
      description: movieDef.description.trim(),
      imdbId: movieDef.imdbId.trim(),
      imdbUrl: movieDef.imdbUrl.trim(),
      imgUrl: movieDef.imgUrl.trim(),
    });

    setMovieDef({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleFieldChange = (name: string, value: string) => {
    setMovieDef((prevData) => ({
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
        value={movieDef.title}
        onChange={(value) => handleFieldChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieDef.description}
        onChange={(value) => handleFieldChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieDef.imgUrl}
        onChange={(value) => handleFieldChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieDef.imdbUrl}
        onChange={(value) => handleFieldChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieDef.imdbId}
        onChange={(value) => handleFieldChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!readyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
