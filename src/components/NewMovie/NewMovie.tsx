/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
  validId: (id: string) => boolean,
};

export const NewMovie: React.FC<Props> = ({ onAdd, validId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [imgUrlError, setImgUrlError] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState('');
  const [imdbIdError, setImdbIdError] = useState('');

  const validUrl = (url: string) => {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
      .test(url);
  };

  const add = () => {
    let flag = true;

    if (title.length === 0) {
      setTitleError('Title is Empty');
      flag = false;
    }

    if (!validUrl(imgUrl)) {
      setImgUrlError('Incorrect Url');
      flag = false;
    }

    if (!validUrl(imdbUrl)) {
      setImdbUrlError('Incorrect Url');
      flag = false;
    }

    if (validId(imdbId)) {
      setImdbIdError('Id exist');
      flag = false;
    }

    if (flag) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="NewMovie"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <table className="NewMovie__table">
        <caption>Add Form</caption>
        <tbody>
          <tr>
            <td>
              <label htmlFor="title">
                Title
              </label>
            </td>
            <td>
              <input
                id="title"
                type="text"
                value={title}
                placeholder="Title"
                className={classNames({ NewMovie__borderError: titleError !== '' })}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setTitleError('');
                }}
              />
            </td>
            <td className="NewMovie__error">
              {titleError}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="Description">
                Description
              </label>
            </td>
            <td>
              <textarea
                id="Description"
                placeholder="Description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="imgUrl">
                Image Url
              </label>
            </td>
            <td>
              <input
                id="imgUrl"
                type="text"
                value={imgUrl}
                placeholder="imgUrl"
                className={classNames({ NewMovie__borderError: imgUrlError !== '' })}
                onChange={(event) => {
                  setImgUrl(event.target.value);
                  setImgUrlError('');
                }}
              />
            </td>
            <td className="NewMovie__error">
              {imgUrlError}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="imdbUrl">
                IMDb Url
              </label>
            </td>
            <td>
              <input
                id="imdbUrl"
                type="text"
                value={imdbUrl}
                placeholder="imdbUrl"
                className={classNames({ NewMovie__borderError: imdbUrlError !== '' })}
                onChange={(event) => {
                  setImdbUrl(event.target.value);
                  setImdbUrlError('');
                }}
              />
            </td>
            <td className="NewMovie__error">
              {imdbUrlError}
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="imdbId">
                imdbId
              </label>
            </td>
            <td>
              <input
                type="text"
                value={imdbId}
                placeholder="imdbId"
                className={classNames({ NewMovie__borderError: imdbIdError !== '' })}
                onChange={(event) => {
                  setImdbId(event.target.value);
                  setImdbIdError('');
                }}
              />
            </td>
            <td className="NewMovie__error">
              {imdbIdError}
            </td>
          </tr>
        </tbody>
      </table>
      <button
        type="submit"
        onClick={add}
      >
        Add
      </button>
    </form>
  );
};
