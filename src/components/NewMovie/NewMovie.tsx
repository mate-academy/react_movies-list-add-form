import React, { FormEvent, useState } from 'react';
import '../../App.scss';

type Props = {
  addMovie: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const submitButtonHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      const movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(movie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <>
      <h1>Add a movie</h1>
      <h2>Title</h2>
      <form onSubmit={event => submitButtonHandler(event)}>
        <input
          type="text"
          required
          placeholder="Enter title"
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
        <br />
        <h2>Description</h2>
        <input
          type="text"
          required
          placeholder="Enter Description"
          onChange={event => setDescription(event.target.value)}
          value={description}
        />
        <br />
        <h2>Image URL</h2>
        <input
          type="text"
          required
          placeholder="Enter Image URL"
          onChange={event => setImgUrl(event.target.value)}
          value={imgUrl}
        />
        <br />
        <h2>Imdb URL</h2>
        <input
          type="text"
          required
          placeholder="Enter Imdb URL"
          onChange={event => setImdbUrl(event.target.value)}
          value={imdbUrl}

        />
        <br />
        <h2>Imdb ID</h2>
        <input
          type="text"
          required
          placeholder="Enter Imdb ID"
          onChange={event => setImdbId(event.target.value)}
          value={imdbId}

        />
        <br />
        {title && description && imgUrl && imdbUrl && imdbId
          ? (
            <button
              className="visible"
              type="submit"
            >
              Add a film
            </button>
          )
          : (
            <button
              className="unvisible"
              type="submit"
              disabled
            >
              Add a film
            </button>
          )}
      </form>
    </>
  );
};
