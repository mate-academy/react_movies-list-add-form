import React, { useState } from 'react';
import './NewMovie.scss';
import { Movie } from '../../react-app-env';

type Props = {
  addMovie: (movie: Movie) => Movie[],
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addMovie({
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
      }}
    >
      <h1>Add new movie!</h1>
      <div
        className="form-box"
      >
        <label>
          <p>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event => {
                setTitle(event.target.value);
              })}
              required
            />
          </p>
        </label>

        <label>
          <p>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={event => {
                setDescription(event.target.value);
              }}
              required
            />
          </p>
        </label>

        <label>
          <p>
            <input
              type="text"
              placeholder="Url of image"
              value={imgUrl}
              onChange={(event => {
                setImgUrl(event.target.value);
              })}
              required
            />
          </p>
        </label>

        <label>
          <p>
            <input
              type="text"
              placeholder="Url of IMDB"
              value={imdbUrl}
              onChange={event => {
                setImdbUrl(event.target.value);
              }}
              required
            />
          </p>
        </label>

        <label>
          <p>
            <input
              type="text"
              placeholder="ID of IMDB"
              value={imdbId}
              onChange={event => {
                setImdbId(event.target.value);
              }}
              required
            />
          </p>
        </label>
        <button
          type="submit"
          className="button button-submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

// function preventDefault() {
//   throw new Error('Function not implemented.');
// }
