import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrln] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title) {
      onAdd(newMovie);
    }

    setTitle('');
    setDescription('');
    setimgUrln('');
    setimdbUrl('');
    setimdbId('');
  };

  return (
    <form
      className="newMovie"
      name="newMovie"
      onSubmit={onSubmit}
    >
      <input
        className="newMovie__input"
        name="title"
        type="text"
        placeholder="Enter the title"
        value={title}
        onChange={event => setTitle(event?.target.value)}
      />
      <input
        className="newMovie__input"
        name="description"
        type="text"
        placeholder="Enter the description"
        value={description}
        onChange={event => setDescription(event?.target.value)}
      />
      <input
        className="newMovie__input"
        name="imgUrl"
        type="text"
        placeholder="Enter the imgUrl"
        value={imgUrl}
        onChange={event => setimgUrln(event?.target.value)}
      />
      <input
        className="newMovie__input"
        name="imdbUrl"
        type="text"
        placeholder="Enter the imdbUrl"
        value={imdbUrl}
        onChange={event => setimdbUrl(event?.target.value)}
      />
      <input
        className="newMovie__input"
        name="imdbId"
        type="text"
        placeholder="Enter the title"
        value={imdbId}
        onChange={event => setimdbId(event?.target.value)}
      />
      <div className="newMovie__button">
        <button type="submit">Add Movie</button>
      </div>

    </form>
  );
};
