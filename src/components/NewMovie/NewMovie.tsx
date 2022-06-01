import React, { useState } from 'react';
import './NewMovie.scss';
import { InputForNewMovie } from './InputForNewMovie/InputForNewMovie';

type Props = {
  onAdd: (movie:Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();

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
      }}
    >
      <InputForNewMovie
        inputTitle="Title"
        name="title"
        value={title}
        onAdd={setTitle}
      />
      <InputForNewMovie
        inputTitle="Description"
        name="description"
        value={description}
        onAdd={setDescription}
      />
      <InputForNewMovie
        inputTitle="Img Url"
        name="imgUrl"
        value={imgUrl}
        onAdd={setImgUrl}
      />
      <InputForNewMovie
        inputTitle="Imdb Url"
        name="imdbUrl"
        value={imdbUrl}
        onAdd={setImdbUrl}
      />
      <InputForNewMovie
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
