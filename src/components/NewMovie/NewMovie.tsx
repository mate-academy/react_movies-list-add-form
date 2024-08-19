import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = newMovie;

  const isValid =
    title.trim().length > 0 &&
    imgUrl.trim().length > 0 &&
    imdbUrl.trim().length > 0 &&
    imdbId.trim().length > 0;

  function reset() {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  const handleChange = (name: string) => (value: string) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isValid) {
      onAdd(newMovie);
      setCount(prev => prev + 1);
      reset();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => handleChange('title')(value)}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleChange('description')(value)}
      />
      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleChange('imgUrl')(value)}
        required
      />
      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleChange('imdbUrl')(value)}
        required
      />
      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleChange('imdbId')(value)}
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
