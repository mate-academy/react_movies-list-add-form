import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';


interface NewMoviesProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }): NewMoviesProps => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s


  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        onChange={() => {}}
        required
      />

      <TextField name="description" label="Description" value="" />

      <TextField name="imgUrl" label="Image URL" value="" />

      <TextField name="imdbUrl" label="Imdb URL" value="" />

      <TextField name="imdbId" label="Imdb ID" value="" />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
