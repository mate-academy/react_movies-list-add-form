import React, { FormEvent, useState } from 'react';

type Props = {
  freshMovie: (movie : Movie) => void;
};

export const NewMovie : React.FC<Props> = ({ freshMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    freshMovie({
      title, description, imgUrl, imdbId, imdbUrl,
    });

    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
    setTitle('');
  };

  return (
    <form onSubmit={(event) => {
      handleSubmit(event);
    }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="ImgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="ImdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="ImdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />
      <button type="submit">
        Add Movie
      </button>
    </form>
  );
};
