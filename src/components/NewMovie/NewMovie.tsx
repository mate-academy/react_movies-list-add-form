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

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const addFilm = (e: React.FormEvent) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie(newMovie);
      clearForm();
    }
  };

  return (
    <form
      onSubmit={addFilm}
      className="form"
    >
      <input
        onChange={event => {
          setTitle(event.target.value);
        }}
        placeholder="title"
        type="text"
      />
      <input
        onChange={event => {
          setDescription(event.target.value);
        }}
        placeholder="description"
        type="text"
      />
      <input
        onChange={event => {
          setImgUrl(event.target.value);
        }}
        placeholder="imgUrl"
        type="text"
      />
      <input
        onChange={event => {
          setImdbId(event.target.value);
        }}
        placeholder="imdbId"
        type="text"
      />
      <input
        onChange={event => {
          setImdbUrl(event.target.value);
        }}
        placeholder="imdbUrl"
        type="text"
      />
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
