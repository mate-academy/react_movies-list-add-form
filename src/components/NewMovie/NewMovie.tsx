import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (FullMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addNewMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      addNewMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      reset();
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
      />
      <input
        className="textarea"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="ImgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="ImdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />
      <input
        className="input"
        type="text"
        placeholder="ImdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button
        type="submit"
        className="button"
      >
        Add
      </button>
    </form>
  );
};
