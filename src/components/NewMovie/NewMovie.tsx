import React, { useState } from 'react';
import './NewMovie.scss';
import { Movie } from '../../react-app-env';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isImgUrl, setIsImgUrl] = useState(true);
  const [isImdbUrl, setIsImdbUrl] = useState(true);
  const [isImdbId, setIsImdbId] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitle(true);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
    setIsImgUrl(true);
  };

  const handleImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
    setIsImdbUrl(true);
  };

  const handleImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
    setIsImdbId(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitle(false);
    }

    if (!imgUrl) {
      setIsTitle(false);
    }

    if (!imdbUrl) {
      setIsTitle(false);
    }

    if (!imdbId) {
      setIsTitle(false);
    }

    if (title && imdbUrl && imdbUrl && imdbId) {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(newMovie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <div className="input-block">
        Title:
        <input
          className="input is-rounded"
          type="text"
          data-cy="form-title"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitle}
        />

        {!isTitle && (
          <span className="error">
            Please, enter a title
          </span>
        )}
      </div>

      <div className="input-block">
        Description:
        <input
          className="input is-rounded"
          type="text"
          data-cy="form-description"
          placeholder="Write a few words about the movie"
          value={description}
          onChange={handleDescription}
        />
      </div>

      <div className="input-block">
        ImgUrl:
        <input
          className="input is-rounded"
          type="text"
          data-cy="form-imgUrl"
          placeholder="https://..."
          value={imgUrl}
          onChange={handleImgUrl}
        />

        {!isImgUrl && (
          <span className="error">
            Please, enter an image&apos;s url
          </span>
        )}
      </div>

      <div className="input-block">
        IMDbUrl:
        <input
          className="input is-rounded"
          type="text"
          data-cy="form-imdbUrl"
          placeholder="https://..."
          value={imdbUrl}
          onChange={handleImdbUrl}
        />

        {!isImdbUrl && (
          <span className="error">
            Please, enter a IMDb url
          </span>
        )}
      </div>

      <div className="input-block">
        IMDbId:
        <input
          className="input is-rounded"
          type="text"
          data-cy="form-imdbId"
          placeholder="tt0314331"
          value={imdbId}
          onChange={handleImdbId}
        />

        {!isImdbId && (
          <span className="error">
            Please, enter a movie&apos;s ID
          </span>
        )}
      </div>

      <button
        className="button"
        type="button"
        data-cy="form-submit-button"
      >
        Add Movie
      </button>
    </form>
  );
};
