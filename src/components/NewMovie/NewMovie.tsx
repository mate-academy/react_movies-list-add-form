import React, { useState } from 'react';

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

  const handleSubmit = () => {
    setIsTitle(!title);
    setIsDescription(!description);
    setIsImgUrl(!imgUrl);
    setIsImdbUrl(!imdbUrl);
    setIsImdbId(!imdbId);

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(movie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="forrm"
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
          onChange={(event) => {
            setTitle(event.target.value);
            setIsTitle(false);
          }}
        />
        {isTitle && (
          <span className="error">Please enter the title</span>
        )}
        <input
          className="inputData"
          name="description"
          type="text"
          value={description}
          placeholder="Enter Description"
          data-cy="form-description"
          onChange={(event) => {
            setDescription(event.target.value);
            setIsDescription(false);
          }}
        />
        {isDescription && (
          <span className="error">Please enter the Description</span>
        )}
        <input
          className="inputData"
          name="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="Enter ImgUrl"
          data-cy="form-imgUrl"
          onChange={(event) => {
            setImgUrl(event.target.value);
            setIsImgUrl(false);
          }}
        />
        {isImgUrl && (
          <span className="error">Please enter the ImgUrl</span>
        )}
        <input
          className="inputData"
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="Enter imdbUrl"
          data-cy="form-imdbUrl"
          onChange={(event) => {
            setImdbUrl(event.target.value);
            setIsImdbUrl(false);
          }}
        />
        {isImdbUrl && (
          <span className="error">Please enter the ImdbUrl</span>
        )}
        <input
          className="inputData"
          name="imdbId"
          type="text"
          value={imdbId}
          placeholder="Enter imdbId"
          data-cy="form-imdbId"
          onChange={(event) => {
            setImdbId(event.target.value);
            setIsImdbId(false);
          }}
        />
        {isImdbId && (
          <span className="error">Please enter the ImdbId</span>
        )}
      </div>
      <button
        className="btn"
        type="submit"
        data-cy="form-submit-button"
      >
        Submit
      </button>
    </form>
  );
};
