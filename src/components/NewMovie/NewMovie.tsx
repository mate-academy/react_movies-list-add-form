import React, { useState } from 'react';
import 'bootstrap/scss/bootstrap.scss';
import classNames from 'classnames';

type Props = {
  addMovie: (movie: Movie) => void;
};

enum MovieKey {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isTitle, setIsTitle] = useState(true);
  const [isImgUrl, setIsImgUrl] = useState(true);
  const [isImdbUrl, setIsImdbUrl] = useState(true);
  const [isImdbId, setIsImdbId] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case MovieKey.Title:
        setTitle(value);
        setIsTitle(true);
        break;

      case MovieKey.Description:
        setDescription(value);
        break;

      case MovieKey.ImgUrl:
        setImgUrl(value);
        setIsImgUrl(true);
        break;

      case MovieKey.ImdbUrl:
        setImdbUrl(value);
        setIsImdbUrl(true);
        break;

      case MovieKey.ImdbId:
        setImdbId(value);
        setIsImdbId(true);
        break;

      default:
        break;
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;

    switch (name) {
      case MovieKey.Title:
        if (!title) {
          setIsTitle(false);
        }

        break;

      case MovieKey.ImgUrl:
        if (!imgUrl) {
          setIsImgUrl(false);
        }

        break;

      case MovieKey.ImdbUrl:
        if (!imdbUrl) {
          setIsImdbUrl(false);
        }

        break;

      case MovieKey.ImdbId:
        if (!imdbId) {
          setIsImdbId(false);
        }

        break;

      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      resetForm();
    }
  };

  const disabledButton = (!isTitle || !isImgUrl || !isImdbUrl || !isImdbId);

  return (
    <form
      className="NewMovie mb-3 mt-3"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className={classNames('form-control mb-4 shadow-none', {
          'border border-danger': !isTitle,
        })}
        data-cy="form-title"
        placeholder="Add a title"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isTitle && <p>Please, enter the title</p>}

      <input
        type="text"
        name="description"
        className="form-control mb-4 shadow-none"
        data-cy="form-description"
        placeholder="Add a description"
        value={description}
        onChange={handleChange}
      />

      <input
        type="url"
        name="imgUrl"
        className={classNames('form-control mb-4 shadow-none', {
          'border border-danger': !isImgUrl,
        })}
        data-cy="form-imgUrl"
        placeholder="Add an image's url"
        value={imgUrl}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImgUrl && <p>Please, enter the url of image</p>}

      <input
        type="url"
        name="imdbUrl"
        className={classNames('form-control mb-4 shadow-none', {
          'border border-danger': !isImdbUrl,
        })}
        data-cy="form-imdbUrl"
        placeholder="Add an IMDB url"
        value={imdbUrl}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImdbUrl && <p>Please, enter the url of movie</p>}

      <input
        type="text"
        name="imdbId"
        className={classNames('form-control mb-4 shadow-none', {
          'border border-danger': !isImdbId,
        })}
        data-cy="form-imdbId"
        placeholder="Add a movie's id"
        value={imdbId}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImdbId && <p>Please, enter the id</p>}

      <button
        type="submit"
        className="d-block btn btn-primary"
        disabled={disabledButton}
      >
        Submit
      </button>
    </form>
  );
};
