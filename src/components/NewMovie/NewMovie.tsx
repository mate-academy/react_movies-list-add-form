import React, { useState } from 'react';

// eslint-disable-next-line max-len
const regexForUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  addMovie: (movie: Movie) => void
};

const checkValidUrl = (value: string) => {
  return !value.replace(regexForUrl, '').length;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const [validTitle, setValidTitle] = useState(true);
  const [validImgbUrl, setValidImgbUrl] = useState(true);
  const [validImdbUrl, setValidImdbUrl] = useState(true);

  const values = [imgUrl, imdbUrl, imdbId];
  const validValues = [validTitle, validImdbUrl, validImgbUrl];
  const disabledButton = values.some(a => a.length === 0) || undefined;

  const addNewFilm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidTitle(title.length > 0);
    setValidImgbUrl(checkValidUrl(imgUrl));
    setValidImdbUrl(checkValidUrl(imdbUrl));

    if (validValues.every(value => value === true)) {
      const movie: Movie = {
        title, description, imgUrl, imdbUrl, imdbId,
      };

      addMovie(movie);
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
        onChange={(event) => {
          setTitle(event.target.value);
          setValidTitle(true);
        }}
      />
      <input
        type="text"
        className="input"
        placeholder="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      {!validImgbUrl && <h4 className="danger-title">Введите правильный адрес картинки</h4>}
      <input
        type="text"
        className="input"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setimgUrl(event.target.value);
          setValidImgbUrl(true);
        }}
      />
      {!validImdbUrl && <h4 className="danger-title">Введите правильный IMDB</h4>}
      <input
        type="text"
        className="input"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setimdbUrl(event.target.value);
          setValidImdbUrl(true);
        }}
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
