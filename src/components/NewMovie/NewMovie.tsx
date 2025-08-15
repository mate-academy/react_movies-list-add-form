import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = ( { onAdd } ) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValid =
  title.trim() &&
  imgUrl.trim() &&
  imdbUrl.trim() &&
  imdbId.trim();

  const handleSubmit = (event: any) => {
    event.preventDefault()

    if (!isValid) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });

    setTitle('')
    setDescription('')
    setImgUrl('')
    setImdbUrl('')
    setImdbId('')

    setCount((prev) => prev + 1);
  };

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
      required
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
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
