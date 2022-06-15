import React, { useState } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;

};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

    <div className="box">
      <h1 className="title is-4">
        Please fill out the form to add a new movie:
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="field">
            <label className="label" htmlFor="title">Title:</label>
            <input
              className="input"
              placeholder="Please enter title"
              type="text"
              value={title}
              id="title"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="description">Description:</label>
            <input
              className="input"
              placeholder="Please enter description"
              type="text"
              value={description}
              id="description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor="imgUrl">Image URL:</label>
            <input
              className="input"
              placeholder="Please enter Image URL"
              type="text"
              value={imgUrl}
              id="imgUrl"
              onChange={(event) => {
                setImgUrl(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="imdbUrl">IMDB URL:</label>
            <input
              className="input"
              placeholder="Please enter IMDB URL"
              type="text"
              value={imdbUrl}
              id="imdbUrl"
              onChange={(event) => {
                setImdbUrl(event.target.value);
              }}
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="imdbId">IMDB ID:</label>
            <input
              className="input"
              placeholder="Please enter IMDB ID"
              type="text"
              value={imdbId}
              id="imdbId"
              onChange={(event) => {
                setImdbId(event.target.value);
              }}
            />
          </div>

        </div>
        <div className="button-conteiner">
          <button
            type="submit"
            className="button"
          >
            Add movie
          </button>
        </div>

      </form>
    </div>

  );
};
