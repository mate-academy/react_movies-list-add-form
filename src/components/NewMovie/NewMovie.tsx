import React, { useState } from 'react';

interface Props {
  onAdd: (movie: Movie) => void,
}

const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      className="Form"
      onSubmit={(e) => {
        e.preventDefault();

        const newFilm = {
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        };

        onAdd(newFilm);

        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');
      }}
    >
      <input
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        onBlur={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="ImgUrl"
        value={imgUrl}
        required
        onChange={(e) => setImgUrl(e.target.value)}
        onBlur={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="ImdbUrl"
        value={imdbUrl}
        required
        onChange={(e) => setImdbUrl(e.target.value)}
        onBlur={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="ImdbId"
        value={imdbId}
        required
        onChange={(e) => setImdbId(e.target.value)}
        onBlur={(e) => setTitle(e.target.value)}
      />

      <button
        type="submit"
      >
        Add a Movie
      </button>
    </form>
  );
};

export default NewMovie;
