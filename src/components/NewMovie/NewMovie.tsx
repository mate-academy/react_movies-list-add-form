import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

enum MovieKeys {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  /* ---------------Error-inputs---------------- */
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const disabledBtn = !title || !imgUrl || !imdbUrl || !imdbId;

  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbId('');
    setImdbUrl('');
    setImgUrl('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case MovieKeys.Title:
        setTitle(value);
        setTitleError(false);
        break;

      case MovieKeys.Description:
        setDescription(value);
        setDescriptionError(false);
        break;

      case MovieKeys.ImgUrl:
        setImgUrl(value);
        setImgUrlError(false);
        break;

      case MovieKeys.ImdbUrl:
        setImdbUrl(value);
        setImdbUrlError(false);
        break;

      case MovieKeys.ImdbId:
        setImdbId(value);
        setImdbIdError(false);
        break;

      default:
        break;
    }
  };

  const handleInputBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    switch (name) {
      case MovieKeys.Title:
        if (!title) {
          setTitleError(true);
        }

        break;

      case MovieKeys.Description:
        if (!description) {
          setDescriptionError(true);
        }

        break;

      case MovieKeys.ImgUrl:
        if (!imgUrl) {
          setImgUrlError(true);
        }

        break;

      case MovieKeys.ImdbUrl:
        if (!imdbUrl) {
          setImdbUrlError(true);
        }

        break;

      case MovieKeys.ImdbId:
        if (!imdbId) {
          setImdbIdError(true);
        }

        break;

      default:
        break;
    }
  };

  const handleNewMovieSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleNewMovieSubmit}
    >
      <input
        type="text"
        data-cy="form-title"
        placeholder="Title"
        className="NewMovie__input"
        name="title"
        value={title}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {titleError && (
        <p className="NewMovie__empty-input">Write a title</p>
      )}

      <input
        type="text"
        data-cy="form-description"
        placeholder="Description"
        className="NewMovie__input"
        name="description"
        value={description}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {descriptionError && (
        <p className="NewMovie__empty-input">Write a description</p>
      )}

      <input
        type="url"
        data-cy="form-imgUrl"
        placeholder="ImgUrl"
        className="NewMovie__input"
        name="imgUrl"
        value={imgUrl}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {imgUrlError && (
        <p className="NewMovie__empty-input">Write a imgUrl</p>
      )}

      <input
        type="url"
        data-cy="form-imdbUrl"
        placeholder="ImdbUrl"
        className="NewMovie__input"
        name="imdbUrl"
        value={imdbUrl}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {imdbUrlError && (
        <p className="NewMovie__empty-input">Write a imdbUrl</p>
      )}

      <input
        type="text"
        data-cy="form-imdbId"
        placeholder="ImdbId"
        className="NewMovie__input"
        name="imdbId"
        value={imdbId}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
      {imdbIdError && (
        <p className="NewMovie__empty-input">Write a imdbId</p>
      )}

      <button
        disabled={disabledBtn}
        type="submit"
        data-cy="form-submit-button"
        className="NewMovie__button"
      >
        OnAdd
      </button>
    </form>
  );
};
