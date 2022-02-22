import React, { useState } from 'react';

// eslint-disable-next-line no-useless-escape
const regexForUrl = '/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/';

type Props = {
  addMovie: (title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string) => void
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const values = [title, description, imgUrl, imdbUrl, imdbId];

  const addNewFilm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addMovie(title, description, imgUrl, imdbUrl, imdbId);
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  return (
    <form onSubmit={(event) => addNewFilm(event)}>
      <input type="text" placeholder="title" value={title} onChange={(event) => setTitle(event.target.value)} required minLength={5} />
      <input type="text" placeholder="description" value={description} onChange={(event) => setDescription(event.target.value)} required minLength={15} />
      <input type="url" placeholder="imgUrl" pattern={regexForUrl} value={imgUrl} onChange={(event) => setimgUrl(event.target.value)} required />
      <input type="url" placeholder="imdbUrl" pattern={regexForUrl} value={imdbUrl} onChange={(event) => setimdbUrl(event.target.value)} required />
      <input type="text" placeholder="imdbId" value={imdbId} onChange={(event) => setimdbId(event.target.value)} required />
      <button type="submit" disabled={values.some(a => a.length === 0) || undefined}>Add</button>
    </form>
  );
};
