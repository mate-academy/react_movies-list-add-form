import React, { useState } from "react";
import { TextField } from "../TextField";
import { Movie } from "../../types/Movie";

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const formFields: Movie = {
    title: "",
    description: "",
    imgUrl: "",
    imdbUrl: "",
    imdbId: "",
  };
  const [newMovie, setNewMovie] = useState<Movie>(formFields);
  const reset = () => {
    setNewMovie(formFields);
  };

  const checkButtonOnDisabled: boolean =
    !!newMovie.title.trim() &&
    !!newMovie.imgUrl.trim() &&
    !!newMovie.imdbUrl.trim() &&
    !!newMovie.imdbId.trim();
  const onSubmitForms = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!checkButtonOnDisabled) {
      return;
    }

    onAdd(newMovie);
    reset();

    setCount((prevCount) => prevCount + 1);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMovie((previousFilmFields) => ({
      ...previousFilmFields,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmitForms} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!checkButtonOnDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
