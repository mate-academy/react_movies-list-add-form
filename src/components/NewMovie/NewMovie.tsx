import React, { useState } from 'react';

// eslint-disable-next-line max-len
const regexForUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

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

  const [isTitleValid, setIsTitleValid] = useState(true);

  const values = [imgUrl, imdbUrl, imdbId];
  const validValues = [validTitle, validUrl];
  const disabledButton = values.some(a => a.length === 0) || undefined;

  const addNewFilm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidTitle(title.length > 0);
    setValidUrl(values.every(value => !value.replace(regexForUrl, '').length));

    if (validValues.every(value => value === true)) {
      addMovie(title, description, imgUrl, imdbUrl, imdbId);
      setTitle('');
      setDescription('');
      setimgUrl('');
      setimdbUrl('');
      setimdbId('');
    }
  };

  return (
    <form onSubmit={(event) => addNewFilm(event)}>
      {!validTitle && <h4 className="danger-title">Минимальная длина названия 1 символ</h4>}
      <input
        type="text"
        className="input"
        placeholder="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      {!validUrl && <h4 className="danger-title">Введите правильный URL-адрес</h4>}
      <input
        type="text"
        className="input"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => setimgUrl(event.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => setimdbUrl(event.target.value)}
      />
      <input
        type="text"
        className="input"
        placeholder="imdbId"
        value={imdbId}
        onChange={(event) => setimdbId(event.target.value)}
      />
      <button type="submit" disabled={disabledButton}>Add</button>
    </form>
  );
};
