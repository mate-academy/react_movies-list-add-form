import React, { useState } from 'react';

type Props = {
  onAdd: (title: string, description: string, imgUrl: string, imdbUrl: string,
    imdbId: string)
  => void;
};

export const NewMovie: React.FC <Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(title, description, imgUrl, imdbUrl, imdbId);
        setTitle('');
        setDescription('');
        setImdbId('');
        setImdbUrl('');
        setImgUrl('');
      }}
    >
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <input
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        type="text"
        name="imgUrl"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />

      <input
        type="text"
        name="imdbUrl"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />

      <input
        type="text"
        name="imdbUrl"
        placeholder="imdbUrl"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button
        type="submit"
      >
        Add movie
      </button>
    </form>
  );
};
