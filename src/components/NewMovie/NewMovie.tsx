import React, { useState } from 'react';
import '../../App.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [addTitle, setAddTitle] = useState(false);
  const [addImgUrl, setAddImgUrl] = useState(false);
  const [addImdbUrl, setAddImdbUrl] = useState(false);
  const [addImdbId, setAddImdbId] = useState(false);

  const hadleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovieCard: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setAddTitle(!title);
    setAddImgUrl(!imgUrl);
    setAddImdbUrl(!imdbUrl);
    setAddImdbId(!imdbId);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd(newMovieCard);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form onSubmit={hadleSubmit}>
      <div className="input-group mb-3">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ color: 'red' }}
        >
          {addTitle && 'please enter a title'}
        </span>

        <input
          type="text"
          placeholder="Title"
          className="form-control"
          aria-describedby="basic-addon1"
          data-cy="form-title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            setAddTitle(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span
          className="input-group-text"
        />
        <textarea
          placeholder="Description"
          className="form-control"
          aria-label="With textarea"
          data-cy="form-description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ color: 'red' }}
        >
          {addImgUrl && 'please enter a Img URL'}
        </span>
        <input
          type="text"
          placeholder="Img URL"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-imgUrl"
          value={imgUrl}
          onChange={(event) => {
            setImgUrl(event.target.value);
            setAddImgUrl(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ color: 'red' }}
        >
          {addImdbUrl && 'please enter a imdb URL'}
        </span>
        <input
          type="text"
          placeholder="imdb URL"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-imdbUrl"
          value={imdbUrl}
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setAddImdbUrl(false);
          }}
        />
      </div>

      <div className="input-group mb-3">
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ color: 'red' }}
        >
          {addImdbId && 'please enter a imdb ID'}
        </span>
        <input
          type="text"
          placeholder="imdb ID"
          className="form-control"
          aria-label="Username"
          aria-describedby="basic-addon1"
          data-cy="form-imdbId"
          value={imdbId}
          onChange={(event) => {
            setImdbId(event.target.value);
            setAddImdbId(false);
          }}
        />
      </div>
      <button
        type="submit"
        className="btn btn-outline-secondary"
        data-cy="form-submit-button"
      >
        Add
      </button>

    </form>
  );
};
