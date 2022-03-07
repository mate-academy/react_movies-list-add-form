import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addNewMovie }) => {
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

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addNewMovie(newMovie);
    clear();
  };

  return (
    <form
      className="form"
      onSubmit={onAdd}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={event => {
          setTitle(event.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={event => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event.target.value);
        }}
        required
      />
      <input
        type="text"
        placeholder="imdbId"
        value={imdbId}
        onChange={event => {
          setImdbId(event.target.value);
        }}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};
