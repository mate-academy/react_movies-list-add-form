import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (newMovieInfo: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addNewMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="new-movie-form"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImgUrl"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImdbUrl"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImdbId"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        className="new-movie-form__field"
      />
      <button
        type="submit"
        className="new-movie-form__button"
      >
        Add
      </button>
    </form>
  );
};
