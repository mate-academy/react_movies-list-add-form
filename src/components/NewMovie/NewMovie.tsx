import { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(title && description && imgUrl && imdbUrl && imdbId)) {
      return;
    }

    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button type="submit">Add</button>
    </form>
  );
};
