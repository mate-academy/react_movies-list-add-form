import React, { useState } from 'react';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = () => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      handleSubmit();
    }}
    >
      <h2 className="title is-3">Add a movie:</h2>

      <input
        className="input is-primary mb-4"
        type="text"
        placeholder="Enter a title"
        required
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <input
        className="input is-primary mb-4"
        type="text"
        placeholder="Enter a description"
        required
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        className="input is-primary mb-4"
        type="text"
        placeholder="Enter a imgUrl"
        required
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />

      <input
        className="input is-primary mb-4"
        type="text"
        placeholder="Enter a imdbUrl"
        required
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />

      <input
        className="input is-primary mb-4"
        type="text"
        placeholder="Enter a imdbId"
        required
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button
        className="button is-success"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
