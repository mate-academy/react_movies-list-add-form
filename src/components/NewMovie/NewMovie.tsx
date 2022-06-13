import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (newMovieInfo: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addNewMovie }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImdbUrl, setNewImdbUrl] = useState('');
  const [newImdbId, setNewImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addNewMovie({
      title: newTitle,
      description: newDescription,
      imgUrl: newImgUrl,
      imdbUrl: newImdbUrl,
      imdbId: newImdbId,
    });

    setNewTitle('');
    setNewDescription('');
    setNewImgUrl('');
    setNewImdbUrl('');
    setNewImdbId('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="new-movie-form"
    >
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(event) => setNewTitle(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="Description"
        value={newDescription}
        onChange={(event) => setNewDescription(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImgUrl"
        value={newImgUrl}
        onChange={(event) => setNewImgUrl(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImdbUrl"
        value={newImdbUrl}
        onChange={(event) => setNewImdbUrl(event.target.value)}
        className="new-movie-form__field"
      />
      <input
        type="text"
        placeholder="ImdbId"
        value={newImdbId}
        onChange={(event) => setNewImdbId(event.target.value)}
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
