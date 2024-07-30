import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setMovie(prevMovie => ({
      ...prevMovie,
      title: '',
    }));
    setMovie(prevMovie => ({
      ...prevMovie,
      description: '',
    }));
    setMovie(prevMovie => ({
      ...prevMovie,
      imgUrl: '',
    }));
    setMovie(prevMovie => ({
      ...prevMovie,
      imdbUrl: '',
    }));
    setMovie(prevMovie => ({
      ...prevMovie,
      imdbId: '',
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = movie;

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(prevCount => prevCount + 1);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(newValue: string) => {
          setMovie(prevMovie => ({
            ...prevMovie,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newValue: string) => {
          setMovie(prevMovie => ({
            ...prevMovie,
            description: newValue,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newValue: string) => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imgUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newValue: string) => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newValue: string) => {
          setMovie(prevMovie => ({
            ...prevMovie,
            imdbId: newValue,
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
            disabled={
              !(
                movie.title.trim() &&
                movie.imgUrl.trim() &&
                movie.imdbUrl.trim() &&
                movie.imdbId.trim()
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
