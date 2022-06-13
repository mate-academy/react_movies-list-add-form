import classNames from 'classnames';
import React, { FormEvent, useState } from 'react';
import './NewMovie.scss';

type Props = {
  freshMovie: (movie : Movie) => void;
};

export const NewMovie : React.FC<Props> = ({ freshMovie }) => {
  const [title, setTitle] = useState('');
  const [isValidTitle, setValidTitle] = useState(true);

  const [description, setDescription] = useState('');
  const [isValidDescription, setValidDescription] = useState(true);

  const [imgUrl, setImgUrl] = useState('');
  const [isValidImgUrl, setValidImgUrl] = useState(true);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isValidImdbUrl, setValidImdbUrl] = useState(true);

  const [imdbId, setImdbId] = useState('');
  const [isValidImdbId, setValidImdbId] = useState(true);
  // eslint-disable-next-line max-len
  const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  const handleSubmit = (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description) {
      setValidDescription(false);
    } else if (!title) {
      setValidTitle(false);
    } else if (!imdbId) {
      setValidImdbId(false);
    } else if (!reg.test(imdbUrl)) {
      setValidImdbUrl(false);
    } else

    if (!reg.test(imgUrl)) {
      setValidImgUrl(false);
    } else {
      freshMovie({
        title, description, imgUrl, imdbId, imdbUrl,
      });

      setDescription('');
      setImdbId('');
      setImdbUrl('');
      setImgUrl('');
      setTitle('');
    }
  };

  return (
    <form onSubmit={(event) => {
      handleSubmit(event);
    }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        className={classNames({ is_not_valid: !isValidTitle })}
        onChange={(event) => {
          setTitle(event.target.value);
          setValidTitle(true);
        }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        className={classNames({ is_not_valid: !isValidDescription })}
        onChange={(event) => {
          setDescription(event.target.value);
          setValidDescription(true);
        }}
      />
      <input
        type="text"
        placeholder="ImgUrl"
        value={imgUrl}
        className={classNames({ is_not_valid: !isValidImgUrl })}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="ImdbUrl"
        value={imdbUrl}
        className={classNames({ is_not_valid: !isValidImdbUrl })}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setValidImdbUrl(true);
        }}
      />
      <input
        type="text"
        placeholder="ImdbId"
        value={imdbId}
        className={classNames({ is_not_valid: !isValidImdbId })}
        onChange={(event) => {
          setImdbId(event.target.value);
          setValidImdbId(true);
        }}
      />
      <button
        type="submit"
        disabled={
          (!description || !title || !imdbId || !imdbUrl || !imgUrl)
        }
      >
        Add Movie
      </button>
    </form>
  );
};
