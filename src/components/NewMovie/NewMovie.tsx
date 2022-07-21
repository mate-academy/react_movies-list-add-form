import React, { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({
  addMovie,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleSubmit = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      onSubmit={(event) => {
        event.preventDefault();
        addMovie(newMovie);
        handleSubmit();
      }}
    >
      <div>
        <label className="label">
          <span>{'Title '}</span>
          <input
            className="input"
            data-cy="form-title"
            type="text"
            value={title}
            placeholder="Inception"
            onChange={event => setTitle(event.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="label">
          <span>{'Description '}</span>
          <textarea
            className="textarea"
            data-cy="form-description"
            value={description}
            placeholder="Follows the lives of eight very different couples..."
            rows={5}
            onChange={event => setDescription(event.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="label">
          <span>{'ImgUrl '}</span>
          <input
            className="input"
            data-cy="form-imgUrl"
            type="text"
            value={imgUrl}
            placeholder="https://....jpg"
            onChange={event => setImgUrl(event.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="label">
          <span>{'ImdbUrl '}</span>
          <input
            className="input"
            data-cy="form-imdbUrl"
            type="text"
            value={imdbUrl}
            placeholder="https://....jpg"
            onChange={event => setImdbUrl(event.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label className="label">
          <span>{'ImdbId '}</span>
          <input
            className="input"
            data-cy="form-imdbId"
            type="text"
            value={imdbId}
            placeholder="tt0314331"
            onChange={event => setImdbId(event.target.value)}
            required
          />
        </label>
      </div>

      <br />

      <button
        className="button is-primary is-fullwidth"
        data-cy="form-submit-button"
        type="submit"
      >
        Add movie
      </button>
    </form>
  );
};
