import { FC, useState } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && description && imgUrl && imdbUrl && imdbId) {
      addMovie(movie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      <div>
        <h1 className="title">
          ADD MOVIES
        </h1>
        <label>
          Movie Title
          <div>
            <input
              type="text"
              value={title}
              placeholder="Title..."
              data-cy="form-title"
              className="input"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
        </label>

        <label>
          Description
          <div>
            <textarea
              value={description}
              data-cy="form-description"
              placeholder="Description..."
              className="textarea"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </label>

        <label>
          IMG
          <div>
            <input
              type="text"
              value={imgUrl}
              placeholder="IMG..."
              data-cy="form-imgUrl"
              className="input"
              onChange={(event) => {
                setImgUrl(event.target.value);
              }}
            />
          </div>
        </label>

        <label>
          ImdbURL
          <div>
            <input
              type="text"
              value={imdbUrl}
              data-cy="form-imdbUrl"
              placeholder="ImdbURL..."
              className="input"
              onChange={(event) => {
                setImdbUrl(event.target.value);
              }}
            />
          </div>
        </label>

        <label>
          ImdbID
          <div>
            <input
              type="text"
              value={imdbId}
              placeholder="ImdbID..."
              data-cy="form-imdbId"
              className="input"
              onChange={(event) => {
                setImdbId(event.target.value);
              }}
            />
          </div>
        </label>

        <button
          type="submit"
        >
          Submit
        </button>
      </div>

    </form>
  );
};
