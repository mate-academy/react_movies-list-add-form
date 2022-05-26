import React, { FormEvent, useState } from 'react';
import Class from 'classnames';
import './NewMovie.scss';

interface Props {
  addMovieOnSubmit: (movie: Movie) => void
}

// eslint-disable-next-line
const checker = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ addMovieOnSubmit }) => {
  const [title, changeTitle] = useState('');

  const [description, changeDescription] = useState('');

  const [imgUrl, changeimgUrl] = useState('');

  const [imdbUrl, changeimdbUrl] = useState('');

  const [imdbId, changeimdbId] = useState('');

  const [isValidImg, changeValid] = useState(true);
  const [isValidImgdb, changeValidbd] = useState(true);

  function reset() {
    changeTitle('');
    changeDescription('');
    changeimgUrl('');
    changeimdbUrl('');
    changeimdbId('');
  }

  function handleSubmit(event: FormEvent): void {
    event.preventDefault();

    if (!checker.test(imgUrl)) {
      changeValid(false);

      return;
    }

    if (!checker.test(imdbUrl)) {
      changeValidbd(false);

      return;
    }

    const newObj = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    reset();

    addMovieOnSubmit(newObj);
  }

  return (
    <form className="form" onSubmit={(event) => handleSubmit(event)}>
      Title
      <input
        className="input is-primary"
        required
        type="text"
        name="title"
        value={title}
        onChange={({ target }) => changeTitle(target.value)}
      />
      Description
      <textarea
        required
        className="textarea is-primary"
        name="description"
        value={description}
        onChange={({ target }) => changeDescription(target.value)}
      />
      ImgUrl
      <input
        className={Class(
          'input',
          { 'is-primary': isValidImg },
          { 'is-danger': !isValidImg },
        )}
        type="text"
        name="imgUrl"
        value={imgUrl}
        onChange={({ target }) => {
          changeValid(true);
          changeimgUrl(target.value);
        }}
      />
      {!isValidImg && (<h2 style={{ color: 'red' }}><b>Invalid</b></h2>)}
      ImdbUrl
      <input
        className={Class(
          'input',
          { 'is-primary': isValidImgdb },
          { 'is-danger': !isValidImgdb },
        )}
        type="text"
        name="imdbUrl"
        value={imdbUrl}
        onChange={({ target }) => {
          changeValidbd(true);
          changeimdbUrl(target.value);
        }}
      />
      {!isValidImgdb && (<h2 style={{ color: 'red' }}><b>Invalid</b></h2>)}
      ImdbId
      <input
        className="input is-primary"
        type="text"
        name="imdbId"
        value={imdbId}
        onChange={({ target }) => changeimdbId(target.value)}
      />

      <button type="submit" className="button is-primary">ADD</button>
    </form>
  );
};
