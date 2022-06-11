import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearInputs = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <>
      <h2 className="title">Add a movie</h2>
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

          clearInputs();
        }}
      >
        <input
          className="input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          required
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          required
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="ImgUrl"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
          required
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="ImdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
          required
        />
        <br />
        <input
          className="input"
          type="text"
          placeholder="ImdbId"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
          required
        />
        <br />

        <button
          className="button"
          type="submit"
        >
          Add new movie
        </button>
      </form>
    </>
  );
};
