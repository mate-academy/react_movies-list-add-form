import React, { useState } from 'react';
import { Movie } from '../../react-app-env';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isDescriptionValid, setIsDescriptionValid] = useState(true);
  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);
  const [isImdbIdValid, setIsImdbIdValid] = useState(true);
  const [isSubmitButtonValid, setIsSubmitButtonValid] = useState(true);

  function isFormValid() {
    return isTitleValid && isDescriptionValid && isImgUrlValid
    && isImdbUrlValid && isImdbIdValid;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (isFormValid()) {
          setIsSubmitButtonValid(true);
          const newMovie = {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          };

          onAdd(newMovie);

          setTitle('');
          setDescription('');
          setImdbId('');
          setImdbUrl('');
          setImgUrl('');

          return;
        }

        setIsSubmitButtonValid(false);
      }}
    >
      <label>
        Title
        <input
          type="text"
          placeholder="Title"
          data-cy="form-title"
          className={isTitleValid ? 'input' : 'input is-danger'}
          value={title}
          required
          onChange={(event => {
            setTitle(event.target.value);
            setIsTitleValid(true);
          })}
          onBlur={() => {
            if (!title) {
              setIsTitleValid(false);
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            } else {
              setIsSubmitButtonValid(false);
            }
          }}
        />

        {isTitleValid
          || <span className="error-message">Title cannot be empty</span>}
      </label>

      <br />

      <label>
        Description
        <input
          type="text"
          placeholder="Description"
          data-cy="form-description"
          className={isDescriptionValid ? 'input' : 'input is-danger'}
          value={description}
          required
          onChange={(event) => {
            setDescription(event.target.value);
            setIsDescriptionValid(true);
          }}
          onBlur={() => {
            if (!description) {
              setIsDescriptionValid(false);
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            } else {
              setIsSubmitButtonValid(false);
            }
          }}
        />

        {isDescriptionValid
          || <span className="error-message">Description cannot be empty</span>}
      </label>

      <br />

      <label>
        Image Url
        <input
          type="text"
          placeholder="ImgUrl"
          data-cy="form-imgUrl"
          className={isImgUrlValid ? 'input' : 'input is-danger'}
          value={imgUrl}
          required
          onChange={(event) => {
            setImgUrl(event.target.value);
            setIsImgUrlValid(true);
          }}
          onBlur={() => {
            if (!imgUrl || !regex.test(imgUrl)) {
              setIsImgUrlValid(false);
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            } else {
              setIsSubmitButtonValid(false);
            }
          }}
        />

        {isImgUrlValid
          || <span className="error-message">Invalid image Url</span>}
      </label>

      <br />

      <label>
        Imdb Url
        <input
          type="text"
          placeholder="ImdbUrl"
          data-cy="form-imdbUrl"
          required
          className={isImdbUrlValid ? 'input' : 'input is-danger'}
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setIsImdbUrlValid(true);
          }}
          onBlur={() => {
            if (!imdbUrl || !regex.test(imdbUrl)) {
              setIsImdbUrlValid(false);
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            } else {
              setIsSubmitButtonValid(false);
            }
          }}
        />

        {isImdbUrlValid
          || <span className="error-message">Invalid imdb Url</span>}
      </label>

      <br />

      <label>
        ImdbId
        <input
          type="text"
          placeholder="ImdbId"
          data-cy="form-imdbId"
          required
          className={isImdbIdValid ? 'input' : 'input is-danger'}
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
            setIsImdbIdValid(true);
          }}
          onBlur={() => {
            if (!imdbId) {
              setIsImdbIdValid(false);
            }

            if (isFormValid()) {
              setIsSubmitButtonValid(true);
            } else {
              setIsSubmitButtonValid(false);
            }
          }}
        />

        {isImdbIdValid
          || <span className="error-message">ImdbId cannot be empty</span>}
      </label>

      <br />
      <br />

      {isSubmitButtonValid
        ? (
          <button
            className="button is-centered"
            type="submit"
          >
            Submit
          </button>
        )
        : (
          <button
            className="button is-centered"
            type="submit"
            disabled
          >
            Submit
          </button>
        )}
    </form>
  );
};
