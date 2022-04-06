import React, { FormEvent, useState } from 'react';

import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const createMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const resetFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMovie();
    resetFields();
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        id="title"
        className="form__title"
        placeholder="Title"
        value={title}
        onChange={(event) => (
          setTitle(event.target.value)
        )}
      />

      <textarea
        name="description"
        id="description"
        className="form__description"
        placeholder="Description"
        value={description}
        onChange={(event) => (
          setDescription(event.target.value)
        )}
      />

      <input
        type="text"
        name="imgUrl"
        id="imgUrl"
        className="form__imgUrl"
        placeholder="Image Url"
        value={imgUrl}
        onChange={(event => (
          setImgUrl(event.target.value)
        ))}
      />
      <input
        type="text"
        name="imdbUrl"
        id="imdbUrl"
        className="form__imdbUrl"
        placeholder="IMDB Url"
        value={imdbUrl}
        onChange={(event => (
          setImdbUrl(event.target.value)
        ))}
      />
      <input
        type="text"
        name="imdbId"
        id="imdbId"
        className="form__imdbId"
        placeholder="IMDB Id"
        value={imdbId}
        onChange={(event => (
          setImdbId(event.target.value)
        ))}
      />

      <button
        type="submit"
        className="form__submit"
      >
        Add
      </button>
    </form>
  );
};
