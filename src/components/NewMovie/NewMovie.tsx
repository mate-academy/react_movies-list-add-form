/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const isTitleValid = title.trim() !== '';

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const isImdbIdValid = imdbId.trim() !== '';

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
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
        value={imgUrl}
        onChange={setImgUrl}
        isUrl
        setIsLinkValid={setIsImdbUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        isUrl
        setIsLinkValid={setIsImgUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isTitleValid || !imgUrl
              || !imdbUrl || !isImdbIdValid
              || !isImgUrlValid || !isImdbUrlValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
