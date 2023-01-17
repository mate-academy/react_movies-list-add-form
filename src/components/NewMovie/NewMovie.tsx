import React, { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,) => void;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultImgUrl?: string;
  defaultImdbUrl?: string;
  defaultImdbId?: string;
};

export const NewMovie: React.FC<Props> = (props) => {
  const {
    onAdd,
    defaultTitle = '',
    defaultDescription = '',
    defaultImgUrl = '',
    defaultImdbUrl = '',
    defaultImdbId = '',
  } = props;
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const [imgUrl, setImgUrl] = useState(defaultImgUrl);
  const [imdbUrl, setImdbUrl] = useState(defaultImdbUrl);
  const [imdbId, setImdbId] = useState(defaultImdbId);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = () => {
    setCount(prev => prev + 1);

    if (
      !title.trim() || !description.trim() || !imgUrl.trim()
      || !imdbUrl.trim() || !imdbId.trim()
    ) {
      return;
    }

    onAdd(title, description, imgUrl, imdbUrl, imdbId);

    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
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
            disabled={!title.trim() || !description.trim() || !imgUrl.trim()
              || !imdbUrl.trim() || !imdbId.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
