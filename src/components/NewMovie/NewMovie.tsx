import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type MovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<MovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = movie;

  const isValidInputs = !title || !imgUrl || !imdbUrl || !imdbId;
  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  };

  const handleChange = (value: string, name: string) => {
    setMovie({ ...movie, [name]: value });
  };

  const onAddMovieHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onAddMovieHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => handleChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleChange(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleChange(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValidInputs}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
