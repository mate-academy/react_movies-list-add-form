import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      resetForm();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="add"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={event => {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Image Url"
          value={imgUrl}
          onChange={event => {
            setImgUrl(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Imdb Url"
          value={imdbUrl}
          onChange={event => {
            setImdbUrl(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Imdb ID"
          value={imdbId}
          onChange={event => {
            setImdbId(event.target.value);
          }}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
