import { FC, useState } from 'react';
import cn from 'classnames';
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

  const [hasinvalidTitle, setHasinvalidTitle] = useState(false);
  const [hasinvalidDescription, setHasinvalidDescription] = useState(false);
  const [hasinvalidImgUrl, setHasinvalidImgUrl] = useState(false);
  const [hasinvalidImdbUrl, setHasinvalidImdbUrl] = useState(false);
  const [hasinvalidImdbId, setHasinvalidImdbId] = useState(false);

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const validateInput = () => {
    if (!title) {
      setHasinvalidTitle(true);
    }

    if (!description) {
      setHasinvalidDescription(true);
    }

    if (!imgUrl) {
      setHasinvalidImgUrl(true);
    }

    if (!imdbUrl) {
      setHasinvalidImdbUrl(true);
    }

    if (!imdbId) {
      setHasinvalidImdbId(true);
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInput();

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
              placeholder="Put Title here"
              data-cy="form-title"
              className={cn(
                'input',
                { error: hasinvalidTitle },
              )}
              onChange={(event) => {
                setTitle(event.target.value);
                setHasinvalidTitle(false);
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
              placeholder="Write Description "
              className={cn(
                'textarea',
                { error: hasinvalidDescription },
              )}
              onChange={(event) => {
                setDescription(event.target.value);
                setHasinvalidDescription(false);
              }}
            />
          </div>
        </label>

        <label>
          Image url
          <div>
            <input
              type="text"
              value={imgUrl}
              placeholder="Image url"
              data-cy="form-imgUrl"
              className={cn(
                'input',
                { error: hasinvalidImgUrl },
              )}
              onChange={(event) => {
                setImgUrl(event.target.value);
                setHasinvalidImgUrl(false);
              }}
            />
          </div>
        </label>

        <label>
          Imdb url
          <div>
            <input
              type="text"
              value={imdbUrl}
              data-cy="form-imdbUrl"
              placeholder="Imdb url"
              className={cn(
                'input',
                { error: hasinvalidImdbUrl },
              )}
              onChange={(event) => {
                setImdbUrl(event.target.value);
                setHasinvalidImdbUrl(false);
              }}
            />
          </div>
        </label>

        <label>
          Imdb Id
          <div>
            <input
              type="text"
              value={imdbId}
              placeholder="Imdb Id"
              data-cy="form-imdbId"
              className={cn(
                'input',
                { error: hasinvalidImdbId },
              )}
              onChange={(event) => {
                setImdbId(event.target.value);
                setHasinvalidImdbId(false);
              }}
            />
          </div>
        </label>

        <button
          type="submit"
          className="button is-dark my-5"
        >
          Submit
        </button>
      </div>

    </form>
  );
};
