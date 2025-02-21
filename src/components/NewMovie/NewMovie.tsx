import React, { useState } from 'react';
import { TextField } from '../TextField';
import {Movie} from "../../types/Movie";

type Props = {
  onAdd: (movie:Movie) => void
}

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [imgUrl, setImgUrl] = useState<string>('')
  const [imdbUrl, setImdbUrl] = useState<string>('')
  const [imdbId, setImdbId] = useState<string>('')

  const resetAll = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCount(count + 1)

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    })

    resetAll()

  }

  const handleError =
    !title.trim() || !imgUrl.trim() || !imdbId.trim() || !imdbUrl.trim();


  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
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
            disabled={handleError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
