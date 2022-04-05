import React, { useState, FormEvent } from 'react';
import classNames from 'classnames';

interface Props {
  onAdd: (movie: Movie) => void,
}

const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [invalidImgUrl, setInvalidImgUrl] = useState(false);
  const [invalidImdbUrl, setInvalidImdbUrl] = useState(false);

  const inputCheck = (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

  const checkImgValidity = () => {
    if (!inputCheck.test(imgUrl)) {
      setInvalidImgUrl(true);
    }
  };

  const checkImdbValidity = () => {
    if (!inputCheck.test(imdbUrl)) {
      setInvalidImdbUrl(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newFilm = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newFilm);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="Form"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >

      <input
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        onBlur={(e) => {
          setTitle(e.target.value);
        }}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={(e) => setDescription(e.target.value)}
      />

      <input
        placeholder="ImgUrl"
        value={imgUrl}
        required
        className={classNames('', { error: invalidImgUrl })}
        onChange={(e) => setImgUrl(e.target.value)}
        onBlur={(e) => {
          checkImgValidity();
          setImgUrl(e.target.value);
        }}
      />
      {invalidImgUrl && (
        <p>Mistake! Wrong imgUrl</p>
      )}

      <input
        placeholder="ImdbUrl"
        value={imdbUrl}
        required
        className={classNames('', { error: invalidImdbUrl })}
        onChange={(e) => setImdbUrl(e.target.value)}
        onBlur={(e) => {
          checkImdbValidity();
          setImdbUrl(e.target.value);
        }}
      />
      {invalidImdbUrl && (
        <p>Mistake! Wrong imdbUrl</p>
      )}

      <input
        placeholder="ImdbId"
        value={imdbId}
        required
        onChange={(e) => setImdbId(e.target.value)}
        onBlur={(e) => setImdbId(e.target.value)}
      />

      <button
        type="submit"
        disabled={invalidImgUrl || invalidImdbUrl}
      >
        Add a Movie
      </button>

    </form>
  );
};

export default NewMovie;
