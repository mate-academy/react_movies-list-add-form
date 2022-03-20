import { useState } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(false);

  const [description, setDescription] = useState('');
  const [isDescription, setIsDescription] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrl, setIsImgUrl] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrl, setIsImdbUrl] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [isImdbId, setIsImdbId] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.length === 0) {
      setIsTitle(true);
    }

    if (description.length === 0) {
      setIsDescription(true);
    }

    if (imgUrl.length === 0) {
      setIsImgUrl(true);
    }

    if (imdbUrl.length === 0) {
      setIsImdbUrl(true);
    }

    if (imdbId.length === 0) {
      setIsImdbId(true);
    }

    if (!(title
      && description
      && imgUrl
      && imdbUrl
      && imdbId)) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setIsTitle(false);

    setDescription('');
    setIsDescription(false);

    setImgUrl('');
    setIsImgUrl(false);

    setImdbUrl('');
    setIsImdbUrl(false);

    setImdbId('');
    setIsImdbId(false);
  };

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        className={classNames('position', { error: isTitle })}
        type="text"
        placeholder="title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <input
        className={classNames('position', { error: isDescription })}
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <input
        className={classNames('position', { error: isImgUrl })}
        type="text"
        placeholder="imgUrl"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event.target.value);
        }}
      />
      <input
        className={classNames('position', { error: isImdbUrl })}
        type="text"
        placeholder="imdbUrl"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
      />
      <input
        className={classNames('position', { error: isImdbId })}
        type="text"
        placeholder="imdbId"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
      />

      <button
        type="submit"
        className="position"
      >
        Add
      </button>
    </form>
  );
};
