/* eslint-disable */
import { useState } from "react";
import { TextField } from "../TextField";

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [imdbUrl, setImdbUrl] = useState("");
  const [imdbId, setImdbId] = useState("");

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={() => {}}
        required
      />

      <TextField name="description" label="Description" value={description} />

      <TextField name="imgUrl" label="Image URL" value={imgUrl} />

      <TextField name="imdbUrl" label="Imdb URL" value={imdbUrl} />

      <TextField name="imdbId" label="Imdb ID" value={imdbId} />

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
