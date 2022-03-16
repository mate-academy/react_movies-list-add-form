import classNames from 'classnames';
import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const checkErrors = () => {
    setTitleError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    checkErrors();
    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      clearForm();
    }
  };

  return (
    <>
      <h1 className="addTitle">
        Add movies
      </h1>
      <form
        className="addForm"
        onSubmit={onSubmit}
      >
        <input
          className={classNames({ error: titleError })}
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(event) => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
        <input
          type="text"
          id="description"
          name="description"
          value={description}
          placeholder="Description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          className={classNames({ error: imgUrlError })}
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="Img Url"
          onChange={(event) => {
            setImgUrl(event.target.value);
            setImgUrlError(false);
          }}
        />
        <input
          className={classNames({ error: imdbUrlError })}
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Imdb Url"
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setImdbIdError(false);
          }}
        />
        <input
          className={classNames({ error: imdbIdError })}
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          placeholder="Imdb Id"
          onChange={(event) => {
            setImdbId(event.target.value);
            setImdbIdError(false);
          }}
        />
        <button type="submit">
          Add
        </button>

      </form>
    </>
  );
};
