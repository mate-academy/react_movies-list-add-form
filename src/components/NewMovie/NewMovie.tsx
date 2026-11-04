import { useState } from 'react';
import { TextField } from '../TextField';
import React from 'react';

type NewMovieProps = {
  onAdd: (movie: {
    title: string;
    description: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
  }) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [newMovieTitle , setNewMovieTitle] = useState('');
  const [newMovieDescription, setNewMovieDescription] = useState('');
  const [newMovieImgUrl, setNewMovieImgUrl] = useState('');
  const [newMovieImdbUrl, setNewMovieImdbUrl] = useState('');
  const [newMovieImdbId, setNewMovieImdbId] = useState('');
  const [count, setCount] = useState(0);

  const isDisabled = !newMovieTitle.trim() || !newMovieImgUrl.trim() || !newMovieImdbUrl.trim() || !newMovieImdbId.trim();


  const handleAdd: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (
      !newMovieTitle.trim() ||
      !newMovieImgUrl.trim() ||
      !newMovieImdbUrl.trim() ||
      !newMovieImdbId.trim()
    ) {
      return;
    }

    onAdd({
      title: newMovieTitle,
      description: newMovieDescription,
      imgUrl: newMovieImgUrl,
      imdbUrl: newMovieImdbUrl,
      imdbId: newMovieImdbId,
    });

    setNewMovieTitle('');
    setNewMovieDescription('');
    setNewMovieImgUrl('');
    setNewMovieImdbUrl('');
    setNewMovieImdbId('');

    setCount(prev => prev + 1);
  }

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieTitle}
        onChange={setNewMovieTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieDescription}
        onChange={setNewMovieDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieImgUrl}
        onChange={setNewMovieImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieImdbUrl}
        onChange={setNewMovieImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieImdbId}
        onChange={setNewMovieImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => handleAdd(event)}
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
