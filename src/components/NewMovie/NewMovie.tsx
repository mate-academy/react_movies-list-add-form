import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movies: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');

  const resetForm = () => {
    setTitle('');
    setImgURL('');
    setImdbURL('');
    setDescription('');
    setImdbID('');
    setCount(count + 1);
  };

  const bntClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl: imgURL,
      imdbId: imdbID,
      imdbUrl: imdbURL,
    });

    resetForm();
  };

  const allFilled =
    title.trim() && imgURL.trim() && imdbURL.trim() && imdbID.trim();

  return (
    <form className="NewMovie" key={count}>
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
        value={imgURL}
        onChange={setImgURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFilled}
            onClick={bntClickHandler}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
