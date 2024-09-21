import React, { useState, FC, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  moviesFromServer: Movie[];
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const requiredFields = [
    newMovie.title.trim(),
    newMovie.imgUrl.trim(),
    newMovie.imdbUrl.trim(),
    newMovie.imdbId.trim(),
  ];

  const isButtonDisabled = !requiredFields.every(Boolean);

  const handleInputChange = (name: keyof Movie, value: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleAddButtonClick = (event: FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);

    resetForm();
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" onSubmit={handleAddButtonClick} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
