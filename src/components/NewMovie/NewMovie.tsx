import React, { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // const [validationDataFields,
  //   setIvalidationDataFields
  // ] = useState(false);

  const enterTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const enterDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const enterImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const enterImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const enterImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(movie);
  };

  return (
    <form
      action="get"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={title}
        onChange={enterTitle}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={description}
        onChange={enterDescription}
      />
      <input
        type="text"
        name="imgUrl"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={enterImgUrl}
      />
      <input
        type="text"
        name="imdbUrl"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={enterImdbUrl}
      />
      <input
        type="text"
        name="imdbId"
        placeholder="imdbId"
        value={imdbId}
        onChange={enterImdbId}
      />
      <button
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
