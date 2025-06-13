import React, { useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

type PropsNewMovie = {
  onAdd: (movie: Movie) => void;
};

const defaultState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<PropsNewMovie> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovieInfo, setNewMovieInfo] = useState<Movie>(defaultState);
  const [isTitle, setIsTitle] = useState<boolean>(false);
  const [isImgUrl, setIsImgUrl] = useState<boolean>(false);
  const [isImdbUrl, setIsImdbUrl] = useState<boolean>(false);
  const [isImdbId, setIsImdbId] = useState<boolean>(false);

  const isSubmit =
    newMovieInfo.title &&
    newMovieInfo.title &&
    newMovieInfo.imdbId &&
    newMovieInfo.imdbUrl &&
    newMovieInfo.imgUrl;

  const handleTitleChange = (newValue: string) => {
    setNewMovieInfo(move => ({
      ...move,
      title: newValue,
    }));

    if (!newMovieInfo.title.trim()) {
      setIsTitle(true);
    }
  };

  const handleDescriptionChange = (newValue: string) => {
    setNewMovieInfo(move => ({
      ...move,
      description: newValue,
    }));
  };

  const handleImgUrlChange = (newValue: string) => {
    setNewMovieInfo(move => ({
      ...move,
      imgUrl: newValue.trim(),
    }));

    if (!newMovieInfo.imgUrl) {
      setIsImgUrl(true);
    }
  };

  const handleImdbUrlChange = (newValue: string) => {
    setNewMovieInfo(move => ({
      ...move,
      imdbUrl: newValue.trim(),
    }));

    if (!newMovieInfo.imdbUrl) {
      setIsImdbUrl(true);
    }
  };

  const handleImdbIdChange = (newValue: string) => {
    setNewMovieInfo(move => ({
      ...move,
      imdbId: newValue.trim(),
    }));

    if (!newMovieInfo.imdbId) {
      setIsImdbId(true);
    }
  };

  const hendlSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitMovieInfo = {
      ...newMovieInfo,
      title: newMovieInfo.title.trim(),
      description: newMovieInfo.description.trim(),
    };

    onAdd(submitMovieInfo);
    setNewMovieInfo(defaultState);

    setCount(prev => prev + 1);
    setIsTitle(false);
    setIsImgUrl(false);
    setIsImdbUrl(false);
    setIsImdbId(false);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={e => hendlSubmit(e)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieInfo.title}
        onChange={handleTitleChange}
        required={isTitle}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieInfo.description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieInfo.imgUrl}
        onChange={handleImgUrlChange}
        required={isImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieInfo.imdbUrl}
        onChange={handleImdbUrlChange}
        required={isImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieInfo.imdbId}
        onChange={handleImdbIdChange}
        required={isImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
