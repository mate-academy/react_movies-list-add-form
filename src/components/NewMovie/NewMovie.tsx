import { useState } from 'react';

type AddMovie = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<AddMovie> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        className="form__title"
        type="text"
        placeholder="Enter a title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />

      <input
        className="form__description"
        type="text"
        placeholder="Enter a description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />

      <input
        className="form__imgUrl"
        type="text"
        placeholder="Enter image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />

      <input
        className="form__imdbUrl"
        type="text"
        placeholder="Enter imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />

      <input
        className="form__imdbId"
        type="text"
        placeholder="Enter a imdb ID"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
};
