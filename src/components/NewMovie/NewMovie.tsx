import React, { useState } from 'react';

type Props = {
  onAddMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdgUrl('');
    setImdbId('');
  };

  const handleFormSubmit = () => {
    const newMovies = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAddMovie(newMovies);
    clearForm();
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <h2 className="form__title">Add your new mowie!</h2>
      <input
        type="text"
        className="input"
        placeholder="Enter a title"
        required
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        required
        className="input"
        placeholder="Enter a description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        required
        className="input"
        placeholder="Past an imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        type="text"
        required
        className="input"
        placeholder="Past an imdgUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdgUrl(event.target.value);
        }}
      />
      <input
        type="text"
        required
        className="input"
        placeholder="Enter a imbdId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />
      <button
        className="button is-primary is-outlined"
        type="submit"
      >
        Add film
      </button>
    </form>
  );
};
