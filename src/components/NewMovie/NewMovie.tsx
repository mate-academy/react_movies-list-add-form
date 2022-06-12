import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [hasTitle, setHasTitle] = useState(false);

  const [description, setDescription] = useState('');
  const [hasDescription, setHasDescription] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrl, setHasImgUrl] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrl, setHasImdbUrl] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbId, setHasImdbId] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTitle(!title);
    setHasDescription(!description);
    setHasImdbId(!imdbId);
    setHasImdbUrl(!imdbUrl);
    setHasImgUrl(!imgUrl);

    if (title && description && imgUrl && imdbUrl && imdbId) {
      addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      setTitle('');
      setDescription('');
      setImdbUrl('');
      setImdbId('');
      setImgUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titleInput">Title: </label>
      <input
        type="text"
        id="titleInput"
        className={classNames({ error: hasTitle }, 'form-control')}
        // className="form-control"
        value={title}
        onChange={(event) => {
          setHasTitle(false);
          setTitle(event.target.value);
        }}
      />

      {hasTitle && (
        <div className="text-danger">Title is empty</div>
      )}

      <label htmlFor="descriptionInput">Description: </label>
      <input
        type="text"
        id="descriptionInput"
        className={classNames({ error: hasDescription }, 'form-control')}
        value={description}
        onChange={(event) => {
          setHasDescription(false);
          setDescription(event.target.value);
        }}
      />

      {hasDescription && (
        <div className="text-danger">Description is empty</div>
      )}

      <label htmlFor="imgUrlInput">ImgUrl: </label>
      <input
        type="url"
        id="imgUrlInput"
        className={classNames({ error: hasImgUrl }, 'form-control')}
        value={imgUrl}
        onChange={(event) => {
          setHasImgUrl(false);
          setImgUrl(event.target.value);
        }}
      />

      {hasImgUrl && (
        <div className="text-danger">ImgUrl is empty</div>
      )}

      <label htmlFor="imdbUrlInput">ImdbUrl: </label>
      <input
        type="url"
        id="imdbUrlInput"
        className={classNames({ error: hasImdbUrl }, 'form-control')}
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
          setHasImdbUrl(false);
        }}
      />

      {hasImdbUrl && (
        <div className="text-danger">ImdbUrl is empty</div>
      )}

      <label htmlFor="imdbIdInput">ImdbId: </label>
      <input
        type="text"
        id="imdbIdInput"
        className={classNames({ error: hasImdbId }, 'form-control')}
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
          setHasImdbId(false);
        }}
      />

      {hasImdbId && (
        <div className="text-danger">ImdbId is empty</div>
      )}

      <button
        type="submit"
        className="mt-2 btn btn-outline-dark"
      >
        Add
      </button>
    </form>
  );
};
