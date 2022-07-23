import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void,
  movies: Movie[],
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  const [description, setdescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');
  const [title, settitle] = useState('');
  const [hastitleError, settitleError] = useState(false);
  const [hasimdbUrlError, setimdbUrlError] = useState(false);
  const [hasimdbIdError, setimdbIdError] = useState(false);
  const [hasimgUrlError, setimgUrlError] = useState(false);
  const [checkButtonElem, checkButton] = useState(true);

  const checkButtonOff = () => {

    if (title && imgUrl && imdbUrl && imdbId) {
      checkButton(false);
    } else {
      checkButton(true);
    }
  }

  useEffect(checkButtonOff);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    settitleError(!title);
    setimgUrlError(!imgUrl);
    setimdbIdError(!imdbId);
    setimdbUrlError(!imdbUrl);

    if (!movies) {
      throw new Error('You got nothing to watch from storage');
      /// /make a variable to show!!!!!!!!!!!!!!!!!!!!!!!!!!
    }

    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    settitle('');
    setdescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className='title'>Add a movie</h2>
      <div className='field'>
        <label className='label control'>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={title}
            data-cy="movie-title"
            className={classNames('input', { 'is-danger': hastitleError})}
            placeholder='Enter a title'
            onBlur={(event)=>(!event.target.value && settitleError(true))}
            onChange={event => {
              settitle(event.target.value);
              settitleError(false);
            }}
          />
          </label>
          {hastitleError && (<p className='help is-danger'>Title is required</p>)}
      </div>

      <div className='field'>
        <label className='label control'>
          <p>Description</p>
          <input
            name="description"
            className='input'
            placeholder='Enter a description'
            data-cy="movie-description"
            value={description}
            onChange={event => {
              setdescription(event.target.value);
            }}
          />
        </label>
      </div>

      <div className='field'>
        <label className='label control'>
          <p>Image URL</p>
          <input
            type="text"
            className={classNames('input', { 'is-danger': hasimgUrlError })}
            name="imgUrl"
            value={imgUrl}
            data-cy="movie-imgUrl"
            onBlur={event=>(!event.target.value && setimgUrlError(true))}
            placeholder='Enter a image URL'
            onChange={event => {
              setimgUrl(event.target.value);
              setimgUrlError(false);
            }}
          />
        </label>
      </div>
      {hasimgUrlError && (<p className='help is-danger'>Image URL is required</p>)}
      <div className='field'>
        <label className='label control'>
          <p>Imdb URL</p>
          <input
            type="text"
            className={classNames('input', { 'is-danger': hasimdbUrlError })}
            name="imdbUrl"
            data-cy="movie-imdbUrl"
            placeholder='Enter a imdb URL'
            value={imdbUrl}
            onBlur={event=>(!event.target.value && setimdbUrlError(true))}
            onChange={event => {
              setimdbUrl(event.target.value);
              setimdbUrlError(false);
            }}
          />
        </label>
      </div>
      {hasimdbUrlError && (<p className='help is-danger'>Imdb URL is required</p>)}
      <div className='field'>
        <label className='label control'>
          <p>Imdb ID</p>
          <input
            type="text"
            name="imdbId"
            data-cy="movie-imdbId"
            className={classNames('input', { 'is-danger': hasimdbIdError})}
            placeholder='Enter a Imdb ID'
            value={imdbId}
            onBlur={event=>(!event.target.value && setimdbIdError(true))}
            onChange={event => {
              setimdbId(event.target.value);
              setimdbIdError(false);
            }}
          />
        </label>
      </div>
      {hasimdbIdError && (<p className='help is-danger'>Imdb ID is required</p>)}

      <div>
        <button
          type="submit"
          data-cy="button-submit"
          className='button is-link'
          disabled={checkButtonElem}
          >Add</button>
      </div>
    </form>
  );
};
