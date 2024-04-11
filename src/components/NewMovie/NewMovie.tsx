import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgURL, setImgURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = () => {
    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgURL.trim(),
      imdbUrl: imdbURL.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    setCount(count + 1);

    setTitle('');
    setDescription('');
    setImgURL('');
    setImdbURL('');
    setImdbId('');
  };

  const finalResult = (): boolean => {
    const result = title && imgURL && imdbURL && imdbId;

    return !!result;
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
            disabled={!finalResult()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
