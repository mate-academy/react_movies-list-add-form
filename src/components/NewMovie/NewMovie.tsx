import React, { useState } from 'react';
import { TextField } from '../TextField';

type NewMovieProps = {
  addNewMovie:(
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string
  ) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ addNewMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => event.preventDefault()}
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
            disabled={(!title || !imgUrl || !imdbUrl || !imdbId) && true}
            onClick={() => {
              addNewMovie(title, description, imgUrl, imdbUrl, imdbId);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
