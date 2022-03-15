import React, { useState } from 'react';
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
  const [hasDescriptionError, setDescriptionError] = useState(false);
  const [hasImagePathError, setImagePathError] = useState(false);
  const [hasMoviePathError, setMoviePathError] = useState(false);
  const [hasMovieIdError, setMovieIdError] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        setTitleError(!title);
        setDescriptionError(!description);
        setImagePathError(!imgUrl);
        setMoviePathError(!imdbUrl);
        setMovieIdError(!imdbId);

        if (title && description && imgUrl && imdbUrl && imdbId) {
          onAdd({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });
          setTitle('');
          setDescription('');
          setImgUrl('');
          setImdbUrl('');
          setImdbId('');
        }
      }}
    >
      <label
        htmlFor="title"
      >
        Title
        <br />
        <input
          type="text"
          id="title"
          className={hasTitleError ? 'error' : ''}
          placeholder="Enter title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label htmlFor="description">
        Description
        <br />
        <input
          type="text"
          id="description"
          className={hasDescriptionError ? 'error' : ''}
          placeholder="Enter description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label htmlFor="imgUrl">
        Image Url
        <br />
        <input
          type="text"
          id="imgUrl"
          className={hasImagePathError ? 'error' : ''}
          placeholder="Enter image path"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label htmlFor="imdbUrl">
        Imdb Url
        <br />
        <input
          type="text"
          id="imdbUrl"
          className={hasMoviePathError ? 'error' : ''}
          placeholder="Enter file path"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <label htmlFor="imdbId">
        Imdb Id
        <br />
        <input
          type="text"
          id="imdbId"
          className={hasMovieIdError ? 'error' : ''}
          placeholder="Enter id"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
        />
      </label>
      <br />
      <br />
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
