import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  setNewMovie: (newMovie: Movie[]) => void;
}

export const NewMovie: React.FC<Props> = ({ setNewMovie }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [onDisabled, setOnDisabled] = useState(true);

  const [titleTouched, setTitleTouched] = useState(false);
  const [imgUrlTouched, setImgUrlTouched] = useState(false);
  const [imdbUrlTouched, setImdbUrlTouched] = useState(false);
  const [imdbIdTouched, setImdbIdTouched] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setOnDisabled(true);

    setTitleTouched(false);
    setImgUrlTouched(false);
    setImdbUrlTouched(false);
    setImdbIdTouched(false);
  };

  const handleFormChange = () => {
    if (title && imgUrl && imdbUrl && imdbId) {
      setOnDisabled(false);
    } else {
      setOnDisabled(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie = [
      {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      },
    ];

    reset();

    setNewMovie(newMovie);
  };

  return (
    <form
      className="NewMovie"
      onChange={handleFormChange}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        touched={titleTouched}
        setTouched={setTitleTouched}
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
        touched={imgUrlTouched}
        setTouched={setImgUrlTouched}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        touched={imdbUrlTouched}
        setTouched={setImdbUrlTouched}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        touched={imdbIdTouched}
        setTouched={setImdbIdTouched}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={onDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
