import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  // #region states
  const [title, setTitle] = useState<Movie['title']>('');
  //const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState<Movie['description']>('');
  //const [hasDescriptionError, setHasDescriptionError] = useState(false);

  const [imgUrl, setImgUrl] = useState<Movie['imgUrl']>('');
  //const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState<Movie['imdbUrl']>('');
  //const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState<Movie['imdbId']>('');
  //const [hasImdbIdError, setHasImdbIdError] = useState(false);
  const [count, setCount] = useState(0);
  // #endregion

  // // #region handlers
  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  //   setHasTitleError(false);
  // };

  // const handleDescriptionChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setDescription(event.target.value);
  //   setHasDescriptionError(false);
  // };

  // const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImgUrl(event.target.value);
  //   setHasImgUrlError(false);
  // };

  // const handleImdbUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImdbUrl(event.target.value);
  //   setHasImdbUrlError(false);
  // };

  // const handleImdbIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImdbId(event.target.value);
  //   setHasImdbIdError(false);
  // };

  // // #endregion

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // setHasTitleError(!title);
    // setHasDescriptionError(!description);
    // setHasImgUrlError(!imgUrl);
    // setHasImdbUrlError(!imdbUrl);
    // setHasImdbIdError(!imdbId);

    // if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
    //   setHasTitleError(true);
    //   setHasDescriptionError(true);
    //   setHasImgUrlError(true);
    //   setHasImdbUrlError(true);
    //   setHasImdbIdError(true);

    //   return;
    // }

    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    setCount(current => current + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    // setHasTitleError(false);
    // setHasDescriptionError(false);
    // setHasImgUrlError(false);
    // setHasImdbUrlError(false);
    // setHasImdbIdError(false);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
