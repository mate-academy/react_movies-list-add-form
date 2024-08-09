import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [movie, setMovie] = useState({
    imdbId: '',

    imdbUrl: '',

    imgUrl: '',

    description: '',

    count: 0,

    title: '',
  });

  const isFormValid = (): boolean =>
    [
      movie.title.trim(),
      movie.imgUrl.trim(),
      movie.imdbUrl.trim(),
      movie.imdbId.trim(),
    ].every(Boolean);

  const isValid = isFormValid();

  const resetForm = () => {
    setMovie(prevSt => ({
      imdbId: '',
      imdbUrl: '',
      imgUrl: '',
      description: '',
      count: prevSt.count + 1,
      title: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    resetForm();
  };

  return (
    <form className="NewMovie" key={movie.count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newTitle => {
          setMovie(prev => ({ ...prev, title: newTitle }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newDescription => {
          setMovie(prev => ({ ...prev, description: newDescription }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newImgUrl => {
          setMovie(prev => ({ ...prev, imgUrl: newImgUrl }));
        }}
        required
        errorMessage="Please, enter valid image URL"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newImdbUrl => {
          setMovie(prev => ({ ...prev, imdbUrl: newImdbUrl }));
        }}
        required
        errorMessage="Please, enter valid image URL IMDB"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newImdbId => {
          setMovie(prev => ({ ...prev, imdbId: newImdbId }));
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
