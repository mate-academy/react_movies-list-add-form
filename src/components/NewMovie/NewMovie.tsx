import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { checkValidUrl } from '../regex';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const areRequiredFieldsFilled = title.trim().length
    && checkValidUrl(imgUrl)
    && checkValidUrl(imdbUrl)
    && imdbId.trim().length;

  const movieMaker = (
    movieTitle: string,
    movieDescription: string,
    movieImgUrl: string,
    movieImdbUrl: string,
    movieImdbId: string,
  ) => {
    return {
      title: movieTitle,
      description: movieDescription,
      imgUrl: movieImgUrl,
      imdbUrl: movieImdbUrl,
      imdbId: movieImdbId,
    };
  };

  const newMovie = movieMaker(
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  );

  const clearData = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleAddNewMovie = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(count + 1);
    onAdd(newMovie);
    clearData();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAddNewMovie}
    >
      <h2 className="title">
        Add a movie
      </h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        validateValue={checkValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validateValue={checkValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areRequiredFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
