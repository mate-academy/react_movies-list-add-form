import React, { useState } from 'react';
import './NewMovie.scss';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = React.memo(({
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const createMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMovie();
    resetForm();
  };

  return (
    <div className="form">
      <h1 className="title">
        Add the Movie
      </h1>
      <form
        method="post"
        action="#"
        onSubmit={handlerChange}
        className="form_main"
      >
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Write the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form_text"
        />
        <textarea
          name="description"
          id="description"
          placeholder="Write the description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form_description"
        />
        <input
          type="text"
          name="imgUrl"
          id="imgUrl"
          placeholder="Write the imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          className="form_text"
        />
        <input
          type="text"
          name="imdbUrl"
          id="imdbUrl"
          placeholder="Write the imdbUrl"
          value={imdbUrl}
          onChange={(e) => setImdbUrl(e.target.value)}
          className="form_text"
        />
        <input
          type="text"
          name="imdbId"
          id="imdbId"
          placeholder="Write the imdbId"
          value={imdbId}
          onChange={(e) => setImdbId(e.target.value)}
          className="form_text"
        />
        <button className="button_add" type="submit">
          Add the Form
        </button>
      </form>
    </div>
  );
});
