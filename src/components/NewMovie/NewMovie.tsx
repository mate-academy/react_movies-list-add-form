import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const initMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState(initMovie);
  const [count, setCount] = useState(0);
  const [button, setButton] = useState(false);
  const handleTitleChange = (value: string) => {
    setMovie(play => ({
      ...play,
      title: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setMovie(play => ({
      ...play,
      description: value,
    }));
  };

  const handleImgUrlChange = (value: string) => {
    setMovie(play => ({
      ...play,
      imgUrl: value,
    }));
  };

  const handleImdbUrlChange = (value: string) => {
    setMovie(play => ({
      ...play,
      imdbUrl: value,
    }));
  };

  const handleImdbIdChange = (value: string) => {
    setMovie(play => ({
      ...play,
      imdbId: value,
    }));
  };

  const reset = () => {
    setMovie(initMovie);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!movie.title.length
      || !movie.imgUrl.length
      || !movie.imdbUrl.length
      || !movie.imdbId.length) {
      return;
    }

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    setCount(x => x + 1);
    reset();
  };

  const checkButton = (item: string) => {
    setButton(true);

    if (!item.length) {
      setButton(false);
    }
  };

  useEffect(() => {
    checkButton(movie.imgUrl);
    checkButton(movie.imdbUrl);
    checkButton(movie.imdbId);
    checkButton(movie.title);
  }, [movie.title, movie.imgUrl, movie.imdbUrl, movie.imdbId]);

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
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!button}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
