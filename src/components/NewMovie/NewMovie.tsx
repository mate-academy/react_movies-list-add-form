import React, { useState } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isTitle, setIsTitle] = useState(true);

  const [description, setDescription] = useState('');
  const [isDescription, setIsDescription] = useState(true);

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrl, setIsImgUrl] = useState(true);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrl, setIsImdbUrl] = useState(true);

  const [imdbId, setImdbId] = useState('');
  const [isImdbId, setIsImdbId] = useState(true);

  const handleSubmit = () => {
    setIsTitle(!!title);
    setIsDescription(!!description);
    setIsImgUrl(!!imgUrl);
    setIsImdbUrl(!!imdbUrl);
    setIsImdbId(!!imdbId);

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (title && description && imgUrl && imdbUrl && imdbId) {
      onAdd(movie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  const handleEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setIsTitle(true);
        break;

      case 'description':
        setDescription(value);
        setIsDescription(true);
        break;

      case 'imgUrl':
        setImgUrl(value);
        setIsImgUrl(true);
        break;

      case 'imdbUrl':
        setImdbUrl(value);
        setIsImdbUrl(true);
        break;

      case 'imdbId':
        setImdbId(value);
        setIsImdbId(true);
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="newMovie"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <input
          className="inputData"
          name="title"
          type="text"
          value={title}
          placeholder="Enter name a new film"
          data-cy="form-title"
          onChange={handleEvent}
        />
        {!isTitle && (
          <span className="error">Please enter the title</span>
        )}
        <input
          className="inputData"
          name="description"
          type="text"
          value={description}
          placeholder="Enter Description"
          data-cy="form-description"
          onChange={handleEvent}
        />
        {!isDescription && (
          <span className="error">Please enter the Description</span>
        )}
        <input
          className="inputData"
          name="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="Enter ImgUrl"
          data-cy="form-imgUrl"
          onChange={handleEvent}
        />
        {!isImgUrl && (
          <span className="error">Please enter the ImgUrl</span>
        )}
        <input
          className="inputData"
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="Enter imdbUrl"
          data-cy="form-imdbUrl"
          onChange={handleEvent}
        />
        {!isImdbUrl && (
          <span className="error">Please enter the ImdbUrl</span>
        )}
        <input
          className="inputData"
          name="imdbId"
          type="text"
          value={imdbId}
          placeholder="Enter imdbId"
          data-cy="form-imdbId"
          onChange={handleEvent}
        />
        {!isImdbId && (
          <span className="error">Please enter the ImdbId</span>
        )}
      </div>
      <button
        className="buttonSubmit"
        type="submit"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
