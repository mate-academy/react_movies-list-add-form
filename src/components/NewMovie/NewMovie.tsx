import React, { useState } from 'react';
import './NewMovie.scss';
import { Input } from './InputForNewMovie/Input';

type Props = {
  onAdd: (movie:Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = () => {
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
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        inputTitle="Title"
        name="title"
        value={title}
        onAdd={setTitle}
      />
      <Input
        inputTitle="Description"
        name="description"
        value={description}
        onAdd={setDescription}
      />
      <Input
        inputTitle="Img Url"
        name="imgUrl"
        value={imgUrl}
        onAdd={setImgUrl}
      />
      <Input
        inputTitle="Imdb Url"
        name="imdbUrl"
        value={imdbUrl}
        onAdd={setImdbUrl}
      />
      <Input
        inputTitle="Imdb Id"
        name="imdbId"
        value={imdbId}
        onAdd={setImdbId}
      />

      <button
        type="submit"
        className="button"
      >
        Add new film
      </button>
    </form>
  );
};
