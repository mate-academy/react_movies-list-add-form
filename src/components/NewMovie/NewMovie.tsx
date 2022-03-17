import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  addNewMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addNewMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const clear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const inputError = () => {
    if (title === '') {
      setTitleCheck(true);
    }

    if (imgUrl === '') {
      setImgUrlCheck(true);
    }

    if (imdbUrl === '') {
      setImdbUrlCheck(true);
    }

    if (imdbId === '') {
      setImdbIdCheck(true);
    }
  };

  const onAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    inputError();

    if (title && imgUrl && imdbUrl && imdbId) {
      addNewMovie(newMovie);
      clear();
    }
  };

  return (
    <form
      className="form"
      onSubmit={onAdd}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={event => {
          setTitle(event.target.value);
          setTitleCheck(false);
        }}
      />
      {titleCheck && <p className="error">This field cannot be empty!</p>}
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={event => {
          setDescription(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event.target.value);
          setImgUrlCheck(false);
        }}
      />
      {imgUrlCheck && <p className="error">This field cannot be empty!</p>}
      <input
        type="text"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event.target.value);
          setImdbUrlCheck(false);
        }}
      />
      {imdbUrlCheck && <p className="error">This field cannot be empty!</p>}
      <input
        type="text"
        placeholder="imdbId"
        value={imdbId}
        onChange={event => {
          setImdbId(event.target.value);
          setImdbIdCheck(false);
        }}
      />
      {imdbIdCheck && <p className="error">This field cannot be empty!</p>}
      <button type="submit">Add</button>
    </form>
  );
};
