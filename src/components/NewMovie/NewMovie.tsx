import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (newMovie: Movie) => void
};
export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

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
        clear();
      }}
    >
      <div className="side-bar">
        <input
          type="text"
          className="input is-primary"
          required
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <input
          type="text"
          className="input is-primary"
          required
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />

        <input
          type="text"
          className="input is-primary"
          placeholder="imgUrl"
          value={imgUrl}
          required
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
        />

        <input
          type="text"
          className="input is-primary"
          placeholder="imdbUrl"
          value={imdbUrl}
          required
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
        />

        <input
          type="text"
          className="input is-primary"
          placeholder="imdbId"
          value={imdbId}
          required
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
        />

        <button
          type="submit"
          className="button is-success is-rounded"
          disabled={!title || !description || !imgUrl || !imdbId || !imdbUrl}
        >
          Add
        </button>
      </div>
    </form>
  );
};
