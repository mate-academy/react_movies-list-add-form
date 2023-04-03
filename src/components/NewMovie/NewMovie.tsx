import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie:Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, increaseCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [logo, setLogo] = useState('');
  const [link, setLink] = useState('');

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setLogo('');
    setLink('');
  };

  const handlerOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl: image,
      imdbUrl: logo,
      imdbId: link,
    });
    clearForm();
    increaseCount(prevCount => prevCount + 1);
  };

  const isButton = (
    title.trim()
    && image.trim()
    && logo.trim()
    && link.trim()
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handlerOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={image}
        onChange={setImage}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={logo}
        onChange={setLogo}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={link}
        onChange={setLink}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
