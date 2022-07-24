import React, { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
};

enum MovieKeys {
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
      case MovieKeys.Title:
        setTitle(value);
        setIsTitle(true);
        break;

      case MovieKeys.Description:
        setDescription(value);
        break;

      case MovieKeys.ImgUrl:
        setImgUrl(value);
        setIsImgUrl(true);
        break;

      case MovieKeys.ImdbUrl:
        setImdbUrl(value);
        setIsImdbUrl(true);
        break;

      case MovieKeys.ImdbId:
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
      case MovieKeys.Title:
        if (!title) {
          setIsTitle(false);
        }

        break;

      case MovieKeys.ImgUrl:
        if (!imgUrl) {
          setIsImgUrl(false);
        }

        break;

      case MovieKeys.ImdbUrl:
        if (!imdbUrl) {
          setIsImdbUrl(false);
        }

        break;

      case MovieKeys.ImdbId:
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
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="title"
        className="border"
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
        className="form"
        data-cy="form-description"
        placeholder="Add a description"
        value={description}
        onChange={handleChange}
      />

      <input
        type="url"
        name="imgUrl"
        className="form"
        data-cy="form-imgUrl"
        placeholder="Add a image's url"
        value={imgUrl}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImgUrl && <p>Enter a image url</p>}

      <input
        type="url"
        name="imdbUrl"
        className="form"
        data-cy="form-imdbUrl"
        placeholder="Add a IMDB url"
        value={imdbUrl}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImdbUrl && <p>Enter a url on movie</p>}

      <input
        type="text"
        name="imdbId"
        className="form"
        data-cy="form-imdbId"
        placeholder="Add a movie's id"
        value={imdbId}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {!isImdbId && <p>Enter a movie id</p>}

      <button
        type="submit"
        className="button"
        disabled={disabledButton}
      >
        Submit
      </button>
    </form>
  );
};
