import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const emptyMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(emptyMovie);
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setCount(prev => prev + 1);
    onAdd(movie);
    // setMovie(emptyMovie);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value: string) => {
          setMovie(prev => ({
            ...prev,
            title: value,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value: string) => {
          setMovie(prev => ({
            ...prev,
            description: value,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value: string) => {
          setMovie(prev => ({
            ...prev,
            imgUrl: value,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value: string) => {
          setMovie(prev => ({
            ...prev,
            imdbUrl: value,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value: string) => {
          setMovie(prev => ({
            ...prev,
            imdbId: value,
          }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(
              e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
            ) => onSubmit(e)}
            disabled={
              !movie.title
              || !movie.imgUrl
              || !movie.imdbUrl
              || !movie.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
