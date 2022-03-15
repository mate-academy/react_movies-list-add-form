import React, { useState } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setTitleError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);

  const resetErrors = () => {
    setTitleError(!title);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    resetErrors();

    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd(newMovie);
      resetForm();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="add"
    >
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className={classNames({ error: hasTitleError })}
          onChange={event => {
            setTitle(event.target.value);
            setTitleError(false);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={event => {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Image Url"
          value={imgUrl}
          className={classNames({ error: hasImgUrlError })}
          onChange={event => {
            setImgUrl(event.target.value);
            setImgUrlError(false);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Imdb Url"
          value={imdbUrl}
          className={classNames({ error: hasImdbUrlError })}
          onChange={event => {
            setImdbUrl(event.target.value);
            setImdbUrlError(false);
          }}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Imdb ID"
          value={imdbId}
          className={classNames({ error: hasImdbIdError })}
          onChange={event => {
            setImdbId(event.target.value);
            setImdbIdError(false);
          }}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};
