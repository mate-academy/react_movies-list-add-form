import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setiMdbUrlError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdError, setImdbIdError] = useState(false);

  const [buttonView, setButtonView] = useState(true);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImgUrl('');
    setImdbId('');
    setButtonView(true);
  };

  const handleMovieAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setiMdbUrlError(!imdbUrl);
    setImgUrlError(!imgUrl);
    setImdbIdError(!imdbId);

    if (titleError
      || imdbUrlError
      || imgUrlError
      || imdbIdError) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleMovieAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => {
          setTitle(newValue);
          if (title && description && imdbUrl && imgUrl && imdbId) {
            setButtonView(false);
          } else {
            setButtonView(true);
          }
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => {
          setDescription(newValue);
          if (title && imdbUrl && imgUrl && imdbId) {
            setButtonView(false);
          } else {
            setButtonView(true);
          }
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => {
          setImgUrl(newValue);
          if (title && imdbUrl && imgUrl && imdbId) {
            setButtonView(false);
          } else {
            setButtonView(true);
          }
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => {
          setImdbUrl(newValue);
          if (title && imdbUrl && imgUrl && imdbId) {
            setButtonView(false);
          } else {
            setButtonView(true);
          }
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => {
          setImdbId(newValue);
          if (title && imdbUrl && imgUrl && imdbId) {
            setButtonView(false);
          } else {
            setButtonView(true);
          }
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonView}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
