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

  const [titleIsInvalid, setTitleIsInvalid] = useState(true);
  const [imgUrlIsInvalid, setImgUrlIsInvalid] = useState(true);
  const [imdbUrlIsInvalid, setImdbUrlIsInvalid] = useState(true);
  const [imdbIdIsInvalid, setImdbIdIsInvalid] = useState(true);

  const [titleIsDirty, setTitleIsDirty] = useState(false);
  const [imgUrlIsDirty, setImgUrlIsDirty] = useState(false);
  const [imdbUrlIsDirty, setImdbUrlIsDirty] = useState(false);
  const [imdbIdIsDirty, setImdbIdIsDirty] = useState(false);

  const urlRegex = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w_-]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  return (
    <form
      className="add-movie"
      onSubmit={(event) => {
        event.preventDefault();

        onAdd({
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        });
      }}
    >
      <div>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Title"
          onBlur={() => {
            if (!titleIsDirty) {
              setTitleIsDirty(true);
            }

            if (!title) {
              setTitleIsInvalid(true);
            }
          }}
          onChange={(event) => {
            setTitleIsInvalid(false);
            setTitle(event.target.value);
          }}
        />
        {titleIsDirty && titleIsInvalid && <p className="add-movie__error">Please enter a title</p>}
      </div>

      <div>
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
      </div>

      <div>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          value={imgUrl}
          placeholder="Image URL"
          onBlur={() => {
            if (!imgUrlIsDirty) {
              setImgUrlIsDirty(true);
            }

            if (!imgUrl.match(urlRegex)) {
              setImgUrlIsInvalid(true);
            }
          }}
          onChange={(event) => {
            setImgUrlIsInvalid(false);
            setImgUrl(event.target.value);
          }}
        />
        {imgUrlIsDirty && imgUrlIsInvalid && <p className="add-movie__error">Please enter a valid URL</p>}
      </div>

      <div>
        <input
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="IMDB URL"
          onBlur={() => {
            if (!imdbUrlIsDirty) {
              setImdbUrlIsDirty(true);
            }

            if (!imdbUrl.match(urlRegex)) {
              setImdbUrlIsInvalid(true);
            }
          }}
          onChange={(event) => {
            setImdbUrlIsInvalid(false);
            setImdbUrl(event.target.value);
          }}
        />
        {imdbUrlIsDirty && imdbUrlIsInvalid && <p className="add-movie__error">Please enter a valid URL</p>}
      </div>

      <div>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          value={imdbId}
          placeholder="IMDB ID"
          onBlur={() => {
            if (!imdbIdIsDirty) {
              setImdbIdIsDirty(true);
            }

            if (!imdbId) {
              setImdbIdIsInvalid(true);
            }
          }}
          onChange={(event) => {
            setImdbIdIsInvalid(false);
            setImdbId(event.target.value);
          }}
        />
        {imdbIdIsDirty && imdbIdIsInvalid && <p className="add-movie__error">Please enter an IMDB ID</p>}
      </div>

      <button
        type="submit"
        disabled={titleIsInvalid
          || imgUrlIsInvalid
          || imdbIdIsInvalid
          || imdbUrlIsInvalid}
      >
        Add movie
      </button>
    </form>
  );
};
