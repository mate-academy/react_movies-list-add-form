import React, { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasImagePathError, setImagePathError] = useState(false);
  const [hasMoviePathError, setMoviePathError] = useState(false);
  const [hasMovieIdError, setMovieIdError] = useState(false);

  const validateInput = () => {
    setTitleError(!title);
    setImagePathError(!imgUrl);
    setMoviePathError(!imdbUrl);
    setMovieIdError(!imdbId);
  };

  const resetInput = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    validateInput();

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      resetInput();
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
    >
      <div className="input-style">
        <label
          htmlFor="title"
        >
          Title
          <br />
          <input
            type="text"
            id="title"
            className={
              classNames({ errorInput: hasTitleError })
            }
            placeholder="Enter title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
        </label>
      </div>

      <div className="input-style">
        <label htmlFor="description">
          Description
          <br />
          <input
            type="text"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </label>
      </div>

      <div className="input-style">
        <label htmlFor="imgUrl">
          Image Url
          <br />
          <input
            type="text"
            id="imgUrl"
            className={
              classNames({ errorInput: hasImagePathError })
            }
            placeholder="Enter image path"
            value={imgUrl}
            onChange={(event) => {
              setImgUrl(event.target.value);
              setImagePathError(false);
            }}
          />
        </label>
      </div>

      <div className="input-style">
        <label htmlFor="imdbUrl">
          Imdb Url
          <br />
          <input
            type="text"
            id="imdbUrl"
            className={
              classNames({ errorInput: hasMoviePathError })
            }
            placeholder="Enter file path"
            value={imdbUrl}
            onChange={(event) => {
              setImdbUrl(event.target.value);
              setMoviePathError(false);
            }}
          />
        </label>
      </div>

      <div className="input-style">
        <label htmlFor="imdbId">
          Imdb Id
          <br />
          <input
            type="text"
            id="imdbId"
            className={
              classNames({ errorInput: hasMovieIdError })
            }
            placeholder="Enter id"
            value={imdbId}
            onChange={(event) => {
              setImdbId(event.target.value);
              setMovieIdError(false);
            }}
          />
        </label>
      </div>

      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
