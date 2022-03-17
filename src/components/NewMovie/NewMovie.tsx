import React, { useState } from 'react';

type NewMovieProps = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<NewMovieProps> = ({
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleTouched, setIsTitleTouched] = useState(false);
  const [isImgUrlTouched, setIsImgUrlTouched] = useState(false);
  const [isImdbUrlTouched, setIsImdbUrlTouched] = useState(false);
  const [isImdIdTouched, setIsImdIdTouched] = useState(false);

  const [error, setError] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const resetInputs = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const firstTouch = () => {
    const newError = { ...error };

    if (!isTitleTouched) {
      newError.title = true;
    }

    if (!isImgUrlTouched) {
      newError.imgUrl = true;
    }

    if (!isImdbUrlTouched) {
      newError.imdbUrl = true;
    }

    if (!isImdIdTouched) {
      newError.imdbId = true;
    }

    setError({ ...newError });
  };

  const onSubmitForm = (check: string[]) => {
    if (check.every(el => el)) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      resetInputs();

      return;
    }

    firstTouch();
  };

  return (
    <form
      className="sidebar__form"
      onSubmit={(event) => {
        event.preventDefault();

        const check: string[] = [title, imgUrl, imgUrl, imdbId];

        onSubmitForm(check);
      }}
    >
      Put the form here
      <label htmlFor="title">
        <input
          id="title"
          type="text"
          value={title}
          placeholder="title"
          onBlur={() => {
            if (!title.trim().length) {
              setError({ ...error, title: true });
            }
          }}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error.title) {
              setError({ ...error, title: false });
              setIsTitleTouched(false);
            }
          }}
        />
        {error.title && (
          <p className="error">
            input Title
          </p>
        )}
      </label>
      <label htmlFor="description">
        <input
          id="description"
          type="text"
          value={description}
          placeholder="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </label>
      <label htmlFor="imgUrl">
        <input
          id="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="imgUrl"
          onBlur={() => {
            if (!imgUrl.trim().length) {
              setError({ ...error, imgUrl: true });
            }
          }}
          onChange={(event) => {
            setImgUrl(event.target.value);

            if (error.imgUrl) {
              setError({ ...error, imgUrl: false });
              setIsImgUrlTouched(false);
            }
          }}
        />
        {error.imgUrl && (
          <p className="error">
            input imgUrl
          </p>
        )}
      </label>
      <label htmlFor="imdbUrl">
        <input
          id="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="imdbUrl"
          onBlur={() => {
            if (!imdbUrl.trim().length) {
              setError({ ...error, imdbUrl: true });
            }
          }}
          onChange={(event) => {
            setImdbUrl(event.target.value);

            if (error.imdbUrl) {
              setError({ ...error, imdbUrl: false });
              setIsImdbUrlTouched(false);
            }
          }}
        />
        {error.imdbUrl && (
          <p className="error">
            input imdb Url
          </p>
        )}
      </label>
      <label htmlFor="imbdId">
        <input
          id="imdbId"
          type="text"
          value={imdbId}
          placeholder="imdbId"
          onBlur={() => {
            if (!imdbId.trim().length) {
              setError({ ...error, imdbId: true });
            }
          }}
          onChange={(event) => {
            setImdbId(event.target.value);

            if (error.imdbId) {
              setError({ ...error, imdbId: false });
              setIsImdIdTouched(false);
            }
          }}
        />
        {error.imdbId && (
          <p className="error">
            input imdb Id
          </p>
        )}
      </label>

      <button type="submit">
        submit
      </button>
    </form>
  );
};
