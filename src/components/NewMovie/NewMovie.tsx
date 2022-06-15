import React, { useState } from 'react';
import './NewMovie.scss';

interface Props {
  addMovie: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ addMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const titleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const descriptionInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const imgUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const imdbUrlInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbUrl(event.target.value);
  };

  const imdbIdInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImdbId(event.target.value);
  };

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title && imgUrl && imdbUrl && imdbId) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      addMovie(newMovie);

      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
    }
  };

  return (
    <form
      className="form"
      onSubmit={submit}
    >
      <h1 className="h1">Add new film:</h1>

      <div className="form-group">
        <label className="control-label col-lg-3" htmlFor="title">Title:</label>
        <div className="col-lg-12">
          <input
            className="form-control"
            type="text"
            id="title"
            value={title}
            onChange={titleInput}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="control-label col-lg-3"
          htmlFor="description"
        >
          Description:
        </label>
        <div className="col-lg-12">
          <input
            className="form-control"
            id="description"
            type="text"
            value={description}
            onChange={descriptionInput}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="control-label col-lg-3"
          htmlFor="imgUrl"
        >
          ImgUrl:
        </label>
        <div className="col-lg-12">
          <input
            className="form-control"
            id="imgUrl"
            type="url"
            value={imgUrl}
            onChange={imgUrlInput}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="control-label col-lg-3"
          htmlFor="imdbUrl"
        >
          imdbUrl:
        </label>
        <div className="col-lg-12">
          <input
            className="form-control"
            id="imdbUrl"
            type="url"
            value={imdbUrl}
            onChange={imdbUrlInput}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label
          className="control-label col-lg-3"
          htmlFor="imdbId"
        >
          imdbId:
        </label>
        <div className="col-lg-12">
          <input
            className="form-control"
            id="imdbId"
            type="text"
            value={imdbId}
            onChange={imdbIdInput}
            required
          />
        </div>
      </div>

      <button
        className="btn btn-default"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};
