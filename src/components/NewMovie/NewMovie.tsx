import { useState } from 'react';

type Props = {
  onAdd: (
    movie: Movie
  ) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasDescriptionError, setDescriptionError] = useState(false);
  const [hasImgUrlError, setImgUrlError] = useState(false);
  const [hasImdbUrlError, setImdbUrlError] = useState(false);
  const [hasImdbIdError, setImdbIdError] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!title);
    setDescriptionError(!description);
    setImgUrlError(!imgUrl);
    setImdbUrlError(!imdbUrl);
    setImdbIdError(!imdbId);

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

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
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <p>Title:</p>

        <input
          className="NewMovie__title"
          placeholder="Enter a title"
          type="text"
          data-cy="form-title"
          value={title}
          onChange={event => {
            setTitle(event.target.value
              .replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
            setTitleError(false);
          }}
        />

        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <p>Description:</p>
        <textarea
          className="NewMovie__description"
          placeholder="Enter a description"
          data-cy="form-description"
          value={description}
          onChange={event => {
            setDescription(event.target.value
              .replace(/[^a-zA-Zа-яА-Я0-9 ]/g, ''));
            setDescriptionError(false);
          }}
        />

        {hasDescriptionError && (
          <span className="error">Please enter a description</span>
        )}
      </div>

      <div className="field">
        <p>Image link:</p>
        <input
          className="NewMovie__imgUrl"
          placeholder="https://m.media-amazon.com/images/M/... .jpg"
          type="text"
          data-cy="form-imgUrl"
          value={imgUrl}
          onChange={event => {
            setImgUrl(event.target.value
              // eslint-disable-next-line max-len
              .replace(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, ''));
            setImgUrlError(false);
          }}
        />

        {hasImgUrlError && (
          <span className="error">Please enter a imgUrl</span>
        )}
      </div>

      <div className="field">
        <p>IMDB link:</p>
        <input
          className="NewMovie__imdbUrl"
          placeholder="https://www.imdb.com/title/..."
          type="text"
          data-cy="form-imdbUrl"
          value={imdbUrl}
          onChange={event => {
            setImdbUrl(event.target.value
              // eslint-disable-next-line max-len
              .replace(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, ''));
            setImdbUrlError(false);
          }}
        />

        {hasImdbUrlError && (
          <span className="error">Please enter a imdbUrl</span>
        )}
      </div>

      <div className="field">
        <p>IMDB ID:</p>
        <input
          className="NewMovie__imdbId"
          placeholder="djijd000066789"
          type="text"
          data-cy="form-imdbId"
          value={imdbId}
          onChange={event => {
            setImdbId(event.target.value
              .replace(/[^0-9A-Za-z ]/g, ''));
            setImdbIdError(false);
          }}
        />

        {hasImdbIdError && (
          <span className="error">Please enter a imdbId</span>
        )}
      </div>

      <button
        className="add_movie"
        type="submit"
        data-cy="form-submit-button"
      >
        Add Movie
      </button>

    </form>
  );
};
