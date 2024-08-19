import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errs, setErrs] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };

  const validate = () => {
    const newErrs = {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    };

    if (!newMovie.title.trim()) {
      newErrs.title = 'Title is required';
    }

    if (!newMovie.imgUrl.trim()) {
      newErrs.imgUrl = 'Image URL is required';
    }

    if (!newMovie.imdbUrl.trim()) {
      newErrs.imdbUrl = 'IMDB URL is required';
    }

    if (!newMovie.imdbId.trim()) {
      newErrs.imdbId = 'IMDB ID is required';
    }

    setErrs(newErrs);

    return !Object.values(newErrs).some(err => err !== '');
  };

  const clearErrs = () => {
    setErrs({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAdd(newMovie);

      setNewMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });

      clearErrs();
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
        onBlur={validate}
        error={errs.title}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        required
        onBlur={validate}
        error={errs.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        required
        onBlur={validate}
        error={errs.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
        onBlur={validate}
        error={errs.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              newMovie.title.trim() === '' ||
              newMovie.imdbUrl.trim() === '' ||
              newMovie.imdbId.trim() === '' ||
              newMovie.imgUrl.trim() === ''
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
