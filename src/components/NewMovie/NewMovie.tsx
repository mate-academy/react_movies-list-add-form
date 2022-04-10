import React, { useState } from 'react';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const createMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMovie();
    resetForm();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="Enter imgUrl"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
      />
      <input
        placeholder="Enter imdbUrl"
        value={imdbUrl}
        onChange={(e) => setImdbUrl(e.target.value)}
      />
      <input
        placeholder="Enter imdbId"
        value={imdbId}
        onChange={(e) => setImdbId(e.target.value)}
      />
      <button type="submit">
        Add movie
      </button>
    </form>
  );
};
