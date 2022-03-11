import React, { useState } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type Errors = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
};

const urlRegex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w_-]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isInvalid, setIsInvalid] = useState({
    title: true,
    imgUrl: true,
    imdbUrl: true,
    imdbId: true,
  });

  const [isDirty, setIsDirty] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const submitIsDisabled = Object.values(isInvalid).some(value => value);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setIsInvalid({
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    });

    setIsDirty({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });

    onAdd(newMovie);
  };

  const validateField = (event: React.FocusEvent<HTMLInputElement>) => {
    const field = event.target.name as keyof Errors;
    const input = event.target.value;

    if (!isDirty[field]) {
      setIsDirty({
        ...isDirty,
        [field]: true,
      });
    }

    switch (field) {
      case 'imgUrl':
      case 'imdbUrl':
        if (!input.match(urlRegex)) {
          setIsInvalid({
            ...isInvalid,
            [field]: true,
          });
        }

        break;

      default:
        if (!input) {
          setIsInvalid({
            ...isInvalid,
            [field]: true,
          });
        }
    }
  };

  return (
    <form
      className="add-movie"
      onSubmit={onSubmit}
    >
      <div>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Title"
          onBlur={validateField}
          onChange={(event) => {
            setIsInvalid({ ...isInvalid, title: false });
            setTitle(event.target.value);
          }}
        />
        {isDirty.title && isInvalid.title && <p className="add-movie__error">Please enter a title</p>}
      </div>

      <div>
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="Image URL"
          onBlur={validateField}
          onChange={(event) => {
            setIsInvalid({ ...isInvalid, imgUrl: false });
            setImgUrl(event.target.value);
          }}
        />
        {isDirty.imgUrl && isInvalid.imgUrl && <p className="add-movie__error">Please enter a valid URL</p>}
      </div>

      <div>
        <input
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="IMDB URL"
          onBlur={validateField}
          onChange={(event) => {
            setIsInvalid({ ...isInvalid, imdbUrl: false });
            setImdbUrl(event.target.value);
          }}
        />
        {isDirty.imdbUrl && isInvalid.imdbUrl && <p className="add-movie__error">Please enter a valid URL</p>}
      </div>

      <div>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          placeholder="IMDB ID"
          onBlur={validateField}
          onChange={(event) => {
            setIsInvalid({ ...isInvalid, imdbId: false });
            setImdbId(event.target.value);
          }}
        />
        {isDirty.imdbId && isInvalid.imdbId && <p className="add-movie__error">Please enter an IMDB ID</p>}
      </div>

      <button
        type="submit"
        disabled={submitIsDisabled}
      >
        Add movie
      </button>
    </form>
  );
};
