import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void
};

// eslint-disable-next-line
const check = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const [urlErr, setUrlErr] = useState<boolean>(false);

  const handleChange = (
    value: string,
    area: (value: string) => void,
  ) => {
    area(value);
  };

  const resetTitles = (...inputs: Array<(a: string) => void>) => {
    inputs.forEach(input => {
      input('');
    });
  };

  return (
    <form onSubmit={(event) => {
      event.preventDefault();

      if (!check.test(imgUrl)) {
        resetTitles(setImgUrl);
        setUrlErr(true);

        return;
      }

      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      resetTitles(
        setTitle,
        setDescription,
        setImgUrl,
        setImdbUrl,
        setImdbId,
      );
    }}
    >
      Title
      <br />
      <input
        value={title}
        type="text"
        onChange={({ target }) => handleChange(target.value, setTitle)}
        required
      />
      <br />
      Description
      <br />
      <input
        value={description}
        type="text"
        onChange={({ target }) => handleChange(target.value, setDescription)}
        required
      />
      <br />
      imgUrl
      <br />
      <input
        type="text"
        value={imgUrl}
        onChange={({ target }) => {
          handleChange(target.value, setImgUrl);
          setUrlErr(false);
        }}
      />
      <br />
      {urlErr && (<p style={{ color: 'red' }}><b>Wrong URL!!!</b></p>)}
      imdbUrl
      <br />
      <input
        type="text"
        value={imdbUrl}
        onChange={({ target }) => handleChange(target.value, setImdbUrl)}
      />
      <br />
      imdbId
      <br />
      <input
        type="text"
        value={imdbId}
        onChange={({ target }) => handleChange(target.value, setImdbId)}
      />
      <br />
      <button type="submit">
        ADD
      </button>
    </form>
  );
};
