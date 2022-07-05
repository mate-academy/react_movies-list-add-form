import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={event => submitHandler(event)}
    >
      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          value={title}
          data-cy="form-title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          data-cy="form-description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Image Url"
          value={imgUrl}
          data-cy="form-imgUrl"
          onChange={(event) => {
            setImgUrl(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="IMBD Url"
          value={imdbUrl}
          data-cy="form-imdbUrl"
          onChange={(event) => {
            setImdbUrl(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="IMBD ID"
          value={imdbId}
          data-cy="form-imdbId"
          onChange={(event) => {
            setImdbId(event.target.value);
          }}
        />
        <button type="submit" data-cy="form-submit-button">
          Add film
        </button>
      </div>
    </form>
  );
};
