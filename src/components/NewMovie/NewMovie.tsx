import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
}
export const NewMovie: React.FC<Props> = ({onAdd}) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: ''
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!movie.title.trim() || !movie.imgUrl.trim() || !movie.imdbUrl.trim() || !movie.imdbId.trim()) {
      return;
    }
    const newMovie = {
      ...movie,
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };

    onAdd(newMovie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prev => prev + 1);
  };

  const isSubmitDisabled =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();
  
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
        value={movie.title}
        onChange={(value) => setMovie(prev => ({...prev, title: value}))}
        required
      />

      <TextField 
        name="description" 
        label="Description" 
        value={movie.description}
        onChange={(value) => setMovie(prev => ({...prev, description: value}))}
      />

      <TextField 
        name="imgUrl"
        label="Image URL" 
        value={movie.imgUrl}
        onChange={(value) => setMovie(prev => ({...prev, imgUrl: value}))}
        required
      />

      <TextField 
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => setMovie(prev => ({...prev, imdbUrl: value}))}
        required
      />

      <TextField 
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => setMovie(prev => ({...prev, imdbId: value}))}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
