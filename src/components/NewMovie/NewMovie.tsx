// import { Component } from 'react';
import React, { useState } from 'react';
import { Movie } from '../../react-app-env';

type Props = {
  addMovie: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState<string>('');
  const [hasTitle, setHasTitle] = useState<boolean>(false);

  const [description, setDescription] = useState<string>('');
  const [hasDescription, setHasDescription] = useState<boolean>(false);

  const [imgUrl, setImgUrl] = useState<string>('');
  const [hasImgUrl, setHasImgUrl] = useState<boolean>(false);

  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [hasImdbUrl, setHasImdbUrl] = useState<boolean>(false);

  const [imdbId, setImdbId] = useState<string>('');
  const [hasImdbId, setHasImdbId] = useState<boolean>(false);

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
      <div className="inputWrapper">
        <span>Title:</span>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setHasTitle(false);
            setTitle(e.target.value);
          }}
        />

        {hasTitle && (
          <span>Title is empty</span>
        )}
      </div>

      <div className="inputWrapper">
        <span>Description:</span>

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setHasDescription(false);
            setDescription(e.target.value);
          }}
        />

        {hasDescription && (
          <span>Description is empty</span>
        )}
      </div>

      <div className="inputWrapper">
        <span>ImgUrl:</span>

        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={(e) => {
            setHasImgUrl(false);
            setImgUrl(e.target.value);
          }}
        />

        {hasImgUrl && (
          <span>ImgUrl is empty</span>
        )}
      </div>

      <div className="inputWrapper">
        <span>ImgUrl:</span>

        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={(e) => {
            setHasImdbUrl(false);
            setImdbUrl(e.target.value);
          }}
        />

        {hasImdbUrl && (
          <span>ImdbUrl is empty</span>
        )}
      </div>

      <div className="inputWrapper">
        <span>ImdbId:</span>

        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={(e) => {
            setHasImdbId(false);
            setImdbId(e.target.value);
          }}
        />

        {hasImdbId && (
          <span>ImdbId is empty</span>
        )}
      </div>

      <button type="submit">Add Card</button>
    </form>
  );
};
